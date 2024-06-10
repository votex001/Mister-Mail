import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { defaultInfo } from './default-emails.js'

export const mailService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
  buildFilter,
  emailsCounter,
  getCleanMail,
  sortMails,
  searchFounder,
}

const STORAGE_KEY = 'emails'

// Create default emails if none exist
_createEmails()

// Query emails based on filters
async function query(filterBy, sortBy) {
  // Retrieve emails from storage
  let emails = await storageService.query(STORAGE_KEY)

  // Filter emails by properties (starred, read, in trash)
  if (filterBy) {
    var { isStarred, isRead, inTrash, sent, filterByName, onDraft } = filterBy
    emails = emails.filter((email) => {
      const filterByStar = isStarred === 'any' || email.isStarred === isStarred
      const filterByRead = isRead === 'any' || email.isRead === isRead
      const filterByInTrash = inTrash === email.inTrash
      const filterByDraft = onDraft === 'any' || onDraft === email.onDraft
      const filterBysent =
        sent === 'any' ||
        (sent && email.from === defaultInfo.loggedinUser.email) ||
        (!sent && email.to === defaultInfo.loggedinUser.email)
      let filterSearch = filterByName?.toLowerCase() || '' // Assign a default value or check if it has a value before using it
      if (filterByName && filterByName.length) {
        filterSearch = filterByName.toLowerCase().includes('me')
          ? (filterByName = defaultInfo.loggedinUser.email)
          : filterByName
      }
      return (
        filterByStar &&
        filterByRead &&
        filterByInTrash &&
        filterByDraft &&
        filterBysent &&
        (email.from.toLowerCase().includes(filterSearch) ||
          email.subject.toLowerCase().includes(filterSearch) ||
          email.body.toLowerCase().includes(filterSearch))
      )
    })
  }

  // Return filtered emails
  if (!sortBy) {
    return emails.sort((a, b) => b.sentAt - a.sentAt)
  } else {
    return sortMails(emails, sortBy)
  }
}

function searchFounder(mails, searchValue, sliceUser = 0, sliceMails = 0) {
  const escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const userRegExp = new RegExp(`\\b${escapedSearchValue}`, 'i')
  const regExp = new RegExp(escapedSearchValue, 'i')
  const result = {
    user: mails.filter((mail) => {
      const isFromMatch = userRegExp.test(mail.from)
      const isFullNameMatch = userRegExp.test(mail.fullName)
      const isNotLoggedInUser =
        mail.from !== defaultInfo.loggedinUser.email &&
        mail.fullName !== defaultInfo.loggedinUser.fullName
      return (isFromMatch || isFullNameMatch) && isNotLoggedInUser
    }),
    mails: mails.filter((mail) => {
      const isSubjectMatch = regExp.test(mail.subject)
      const isBodyMatch = regExp.test(mail.body)
      const isFromMatch = regExp.test(mail.from)
      return isSubjectMatch || isBodyMatch || isFromMatch
    }),
  }

  if (sliceUser > 0) {
    result.user = result.user.slice(0, sliceUser)
  }
  if (sliceMails > 0) {
    result.mails = result.mails.slice(0, sliceMails)
  }

  return result
}

function sortMails(mails, sortBy) {
  switch (sortBy.by) {
    case 'date':
      mails.sort((mail1, mail2) => {
        if (!mail1.removedAt && !mail2.removedAt) {
          return (mail2.sentAt - mail1.sentAt) * sortBy.dir
        } else {
          return (mail2.removedAt - mail1.removedAt) * sortBy.dir
        }
      })
      break
    case 'starred':
      mails.sort((mail1, mail2) => {
        const readStatusComparison =
          (mail2.isStarred - mail1.isStarred) * sortBy.dir
        if (readStatusComparison !== 0) {
          return readStatusComparison
        }
        return mail2.sentAt - mail1.sentAt
      })
      break
    case 'read':
      mails.sort((mail1, mail2) => {
        const readStatusComparison = (mail2.isRead - mail1.isRead) * sortBy.dir
        if (readStatusComparison !== 0) {
          return readStatusComparison
        }
        return mail2.sentAt - mail1.sentAt
      })
      break
    case 'subject':
      mails.sort(
        (mail1, mail2) =>
          mail1.subject.localeCompare(mail2.subject) * sortBy.dir
      )
      break
    default:
      // handle default case if sortBy.by is not one of the above
      mails.sort((a, b) => b.sentAt - a.sentAt)
      break
  }
  return mails
}

function getCleanMail() {
  return {
    subject: '',
    body: '',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: null,
    removedAt: null,
    from: '',
    fullName: '',
    to: '',
  }
}
function getDefaultFilter() {
  return {
    isRead: 'any',
    isStarred: 'any',
    inTrash: false,
    sent: 'any',
    filterByName: '',
    onDraft: false,
  }
}
function buildFilter(folder) {
  const filterMap = {
    all: { sent: 'any' },
    unread: { isRead: false },
    starred: { isStarred: true, sent: 'any' },
    bascket: { inTrash: true, onDraft: 'any' },
    sent: { sent: true },
    draft: { onDraft: true },
  }
  return filterMap[folder]
}
async function emailsCounter() {
  const emails = await query()
  return emails?.reduce(
    (a, b) => {
      if (!b.isRead && !b.inTrash) a.unread++
      if (b.inTrash) a.bascket++
      if (b.isStarred) a.starred++
      if (b.onDraft && !b.inTrash) a.draft++
      return a
    },
    { unread: 0, bascket: 0, starred: 0, draft: 0 }
  )
}

// Get an email by ID
function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

// Remove an email by ID
function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

// Save an email (update or create)
function save(mail) {
  if (mail.id) {
    return query().then((entities) => {
      const entity = entities.find((entity) => entity.id === mail.id)

      if (!entity) {
        return storageService.post(STORAGE_KEY, {
          ...mail,
          sentAt: Date.now(),
        })
      } else {
        return storageService.put(STORAGE_KEY, mail)
      }
    })
  } else {
    return storageService.post(STORAGE_KEY, { ...mail, sentAt: Date.now() })
  }
}

// Initialize default emails if none exist
function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    // Load default emails and sort by sentAt date
    emails = defaultInfo.emails
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}

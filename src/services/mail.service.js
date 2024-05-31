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
}

const STORAGE_KEY = 'emails'

// Create default emails if none exist
_createEmails()

// Query emails based on filters
async function query(filterBy) {
  // Retrieve emails from storage
  let emails = await storageService.query(STORAGE_KEY)

  // Filter emails by properties (starred, read, in trash)
  if (filterBy) {
    var { isStarred, isRead, inTrash, sent, filterByName } = filterBy
    emails = emails.filter((email) => {
      const filterByStar = isStarred === 'any' || email.isStarred === isStarred
      const filterByRead = isRead === 'any' || email.isRead === isRead
      const filterByInTrash = inTrash === email.inTrash
      const filterBysent =
        sent === 'any' ||
        (sent && email.from === defaultInfo.loggedinUser.email) ||
        (!sent && email.to === defaultInfo.loggedinUser.email)
      const filterSearch = filterByName.toLowerCase().includes('me')
        ? (filterByName = defaultInfo.loggedinUser.email)
        : filterByName
      return (
        filterByStar &&
        filterByRead &&
        filterByInTrash &&
        filterBysent &&
        (email.from.includes(filterSearch) ||
          email.subject.includes(filterSearch))
      )
    })
  }

  // Return filtered emails
  return emails.sort((a, b) => b.sentAt - a.sentAt)
}
function getDefaultFilter() {
  return {
    isRead: 'any',
    isStarred: 'any',
    inTrash: false,
    sent: 'any',
    filterByName: '',
  }
}
function buildFilter(folder) {
  const filterMap = {
    all: { sent: 'any' },
    unread: { isRead: false },
    starred: { isStarred: true, sent: 'any' },
    bascket: { inTrash: true },
    sent: { sent: true },
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
      return a
    },
    { unread: 0, bascket: 0, starred: 0 }
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
    // Update existing email
    return storageService.put(STORAGE_KEY, mail)
  } else {
    const newMail = {
      subject: mail.subject,
      body: mail.body,
      isRead: true,
      isStarred: false,
      inTrash: false,
      sentAt: Date.now(),
      removedAt: null,
      from: defaultInfo.loggedinUser.email,
      to: mail.to,
    }
    return storageService.post(STORAGE_KEY, newMail)
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

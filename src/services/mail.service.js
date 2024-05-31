import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { defaultInfo } from './default-emails.js'


export const mailService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter
}

const STORAGE_KEY = 'emails'


const filterBy = {
  status: 'inbox/sent/star/trash',
  txt: 'puki',
  isRead: 'true/false/null'
}

// Create default emails if none exist
_createEmails()

// Query emails based on filters
async function query(filterBy, filterByName) {
  // Retrieve emails from storage
  let emails = await storageService.query(STORAGE_KEY)

  // Filter emails by name (from or subject)
  if (filterByName) {
    emails = emails.filter(email => email.from.includes(filterByName) || email.subject.includes(filterByName))
  }

  // Filter emails by properties (starred, read, in trash)
  if (filterBy) {
    var { isStarred, isRead, inTrash, sended } = filterBy



    emails = emails.filter(email => {
      const filterByStar = isStarred === 'any' || email.isStarred === isStarred;
      const filterByRead = isRead === 'any' || email.isRead === isRead;
      const filterByInTrash = inTrash === email.inTrash;
      const filterBySended = sended === 'any' || (sended && email.from === defaultInfo.loggedinUser.email) || (!sended && email.to === defaultInfo.loggedinUser.email);
      return filterByStar && filterByRead && filterByInTrash && filterBySended;
    })
  }

  // Return filtered emails
  return emails.sort((a, b) => b.sentAt - a.sentAt)
}
function getDefaultFilter(){
  return {
    isRead: "any",
    isStarred: "any",
    inTrash: false,
    sended: false
}
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
      isRead: false,
      isStarred: false,
      inTrash: false,
      sentAt: Date.now(),
      removedAt: null,
      from: defaultInfo.loggedinUser.email,
      to: mail.to
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




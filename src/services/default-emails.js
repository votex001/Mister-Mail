import { utilService } from './util.service'

const loggedinUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

const emails = [
  {
    id: utilService.makeId(),
    subject: 'Miss you',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: loggedinUser.email,
  },
  {
    id: utilService.makeId(),
    subject: 'What do you do to get rid of stress?',
    body: 'Thrown shy denote ten ladies though ask saw.',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: 1243468800000,
    removedAt: null,
    from: 'mark.sweeney@comcast.net',
    to: loggedinUser.email,
  },
  {
    id: utilService.makeId(),
    subject: "What's your favorite way to waste time?",
    body: 'Insipidity the sufficient discretion imprudence resolution sir him decisively.',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: 1280275200000,
    removedAt: null,
    from: 'zz5djndn6f86sa8@ymail.com',
    to: loggedinUser.email,
  },
  {
    id: utilService.makeId(),
    subject: 'When you describe yourself to others, what words do you use?',
    body: ' Explained propriety off out perpetual his you.',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: 1305676800000,
    removedAt: null,
    from: 'ubayd.avery@outlook.com',
    to: loggedinUser.email,
  },
  {
    id: utilService.makeId(),
    subject: 'What kind of case do you have for your phone? Why did you choose it?',
    body: 'By an outlived insisted procured improved am.',
    isRead: false,
    isStarred: false,
    inTrash: false,
    onDraft: false,
    sentAt: 1404432000000,
    removedAt: null,
    from: 'sscewwvjyht@gmail.com',
    to: loggedinUser.email,
  },
]

export const defaultInfo = {
  loggedinUser,
  emails,
}

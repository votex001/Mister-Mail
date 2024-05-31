import { EmailPreview } from './EmailPreview';

export function EmailList({ emails, isRemovedAtTime, isOnStarred, sendToTrash, onRemove, onRead }) {
    return (
        <>
            {emails &&
                <>
                    {
                        emails.map((email) =>
                            <EmailPreview
                                isRemovedAtTime={isRemovedAtTime}
                                email={email}
                                key={email.id}
                                isOnStarred={isOnStarred}
                                sendToTrash={sendToTrash}
                                onRemove={onRemove}
                                onRead={onRead}
                            />)
                    }
                </>
            }
        </>
    )
}
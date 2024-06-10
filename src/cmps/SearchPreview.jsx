import { LetteredAvatar } from './LetteredAvatar'

export function SearchPreview({ searchResult }) {
  console.log(searchResult)
  return (
    <main className="search-preview">
      {!!searchResult.user.length &&
        searchResult.user.map((user) => (
          <section key={user.fullName} className="profile-result" onClick={(e)=>e.stopPropagation()}>
            <LetteredAvatar
              radius="0px"
              size="40px"
              name={user.fullName}
              className="search-avatar"
            />
            <div>
              <h3 className="profile-name">{user.fullName}</h3>
              <p className="profile-mail">{user.from}</p>
            </div>
          </section>
        ))}
    </main>
  )
}

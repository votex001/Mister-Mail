import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { UserMsg } from './cmps/UserMsg'

export function App() {
  return (
    <Router>
      <section className="main-app">
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<EmailIndex />}></Route>
            <Route path="/:folder" element={<EmailIndex />}>
              <Route path="/:folder/:mailId" element={<EmailDetails />} />
            </Route>
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}

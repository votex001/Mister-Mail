import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { EmailIndex } from "./pages/EmailIndex";
import { SideBar } from "./cmps/SideBar";
import { EmailDetails } from "./pages/EmailDetails";
import { useState } from "react";





export function App() {
  
    return (
        <Router>
            <section className='main-app'>
                <main className='flex'>
                    <Routes>
                        <Route path="/" element={<EmailIndex />}></Route>
                        <Route path="/:mail" element={<EmailIndex  />} >
                            <Route path="/:mail/:mailId" element={<EmailDetails />} />
                        </Route>
                    </Routes>
                </main>
            </section>
        </Router>


    )
}


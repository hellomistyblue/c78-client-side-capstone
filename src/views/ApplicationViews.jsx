import { Route, Routes, Outlet } from "react-router-dom"
import Nav from "/src/components/Nav"
import AddALeadPage from "/src/components/AddALeadPage"
import ServiceLeadsPage from "/src/components/ServiceLeadsPage"
import InactiveLeadsPage from "/src/components/InactiveLeadsPage"
import { useState, useEffect } from 'react'



export const ApplicationViews = () => {
  const [currentAgent, setCurrentAgent] = useState(null)

  useEffect(() => {
    setCurrentAgent(JSON.parse(localStorage.getItem('agent_user')))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<>
        <Nav />
        <Outlet />
      </>} >
        <Route index element={<AddALeadPage currentAgentId={currentAgent?.id} />} />
        <Route path="/service-leads" element={<ServiceLeadsPage currentAgentId={currentAgent?.id} />} />
        <Route path="/inactive-leads" element={<InactiveLeadsPage currentAgentId={currentAgent?.id} />} />
      </Route>
    </Routes>
  )
}
















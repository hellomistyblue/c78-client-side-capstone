import { Route, Routes, Outlet } from "react-router-dom"
import Nav from "/src/components/Nav"
import AddALead from "/src/components/AddALead"
import ServiceLeads from "/src/components/ServiceLeads"
import InactiveLeads from "/src/components/InactiveLeads"
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
        <Route index element={<AddALead currentAgentId={currentAgent} />} />
        <Route path="/service-leads" element={<ServiceLeads />} />
        <Route path="/inactive-leads" element={<InactiveLeads />} />
      </Route>
    </Routes>
  )
}
















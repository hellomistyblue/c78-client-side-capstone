import { getActiveLeads } from "../services/leadService"
import { useEffect, useState } from "react";
import ActiveLead from "./ActiveLead";

const ServiceLeadsPage = ({ currentAgentId }) => {
    const [activeLeads, setActiveLeads] = useState([])


    useEffect(() => {
        getActiveLeads(currentAgentId).then((activeLeadArray) => {
            setActiveLeads(activeLeadArray)
        })
    }, [currentAgentId])
    return (
        <section>
            <h1>What are you doing to service your leads today?</h1>
            <table>
                <thead>
                    <tr>
                        <th>Lead Name</th>
                        <th>Service</th>
                        <th>Add Time</th>
                        <th>Next Follow Up?</th>
                        <th> </th>
                        <th>Total Time In</th>
                        <th>Follow Up On</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {activeLeads.map((activeLeadObj) => {
                        return (
                            <ActiveLead
                                activeLead={activeLeadObj}
                                key={activeLeadObj.id}
                                setActiveLeads={setActiveLeads}
                                currentAgentId={currentAgentId}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default ServiceLeadsPage



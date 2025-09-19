import { getActiveLeads } from "../services/leadService"
import { useEffect, useState } from "react";
import ActiveLead from "./ActiveLead";

const ServiceLeads = () => {
    const [activeLeads, setActiveLeads] = useState([])

    useEffect(() => {
        getActiveLeads().then((activeLeadArray) => {
            setActiveLeads(activeLeadArray)
        })
    }, [])
    console.log(activeLeads)
    return (
        <section>
            <h1>What are you doing to service your leads today?</h1>
            <table>
                <thead>
                    <tr>
                        <th>Lead Name</th><th>Total Time In</th><th>Follow Up On</th>
                    </tr>
                </thead>
                <tbody>
                    {activeLeads.map((activeLeadObj) => {
                        return (
                            <ActiveLead activeLead={activeLeadObj} key={activeLeadObj.id} />
                        )
                    })}
                </tbody>
            </table>


        </section>

    )
}

export default ServiceLeads



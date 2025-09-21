import { getInactiveLeads } from "../services/leadService"
import { useState, useEffect } from "react"
import InactiveLead from "./InactiveLead"


const InactiveLeads = () => {
    const [inactiveLeads, setInactiveLeads] = useState([])

    useEffect(() => {
        getInactiveLeads().then((inactiveLeadArray) => {
            setInactiveLeads(inactiveLeadArray)
        })
    }, [])
    return (
        <section>
            <h1>Inactive Leads</h1>
            <table>
                <thead>
                    <tr>
                        <th>Lead Name</th><th>Initial Time In</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {inactiveLeads.map((inactiveLeadObj) => {
                        return (
                            <InactiveLead
                                inactiveLead={inactiveLeadObj}
                                key={inactiveLeadObj.id}
                                setInactiveLeads={setInactiveLeads}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default InactiveLeads
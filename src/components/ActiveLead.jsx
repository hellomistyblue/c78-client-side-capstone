import { useEffect, useState } from "react"
import { getStatusOptions } from "../services/statusService"
import { changeStatus } from "../services/leadService"
import { getActiveLeads } from "../services/leadService"

const ActiveLead = ({ activeLead, setActiveLeads }) => {
    const [selectedStatus, setSelectedStatus] = useState(0)
    const [statusOptions, setStatusOptions] = useState([])

    const handleChange = event => {
        const statusId = parseInt(event.target.value)
        setSelectedStatus(statusId)
        changeStatus(activeLead.id, { ...activeLead, status: statusId })
        getActiveLeads().then((activeLeadArray) => {
            setActiveLeads(activeLeadArray)
        })
    }
    useEffect(() => {
        getStatusOptions().then(setStatusOptions)
    }, [setStatusOptions])

    return (
        <tr>
            <td>{activeLead.fullName}</td>
            <td>{activeLead.initialTimeSpent}</td>
            <td>{activeLead.followUpDate}</td>
            <td>
                <fieldset>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={selectedStatus}
                        onChange={handleChange}
                    >
                        {statusOptions.map(statusOption => (
                            <option key={statusOption.id} value={statusOption.id}>
                                {statusOption.type}
                            </option>
                        ))}
                    </select>
                </fieldset>
            </td >
        </tr >
    )
}


export default ActiveLead



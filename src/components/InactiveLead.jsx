import { useEffect, useState } from "react"
import { getStatusOptions } from "../services/statusService"
import { changeStatus } from "../services/leadService"
import { getInactiveLeads } from "../services/leadService"

const InactiveLead = ({ inactiveLead, setInactiveLeads }) => {

    const [statusOptions, setStatusOptions] = useState([])

    const handleChange = event => {
        const statusId = parseInt(event.target.value)

        changeStatus(inactiveLead.id, { ...inactiveLead, status: statusId })
        getInactiveLeads().then((inactiveLeadArray) => {
            setInactiveLeads(inactiveLeadArray)
        })
    }
    useEffect(() => {
        getStatusOptions().then(setStatusOptions)
    }, [setStatusOptions])

    return (
        <tr>
            <td>{inactiveLead.fullName}</td>
            <td>{inactiveLead.initialTimeSpent}</td>
            <td>
                <fieldset>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={inactiveLead.status}
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


export default InactiveLead



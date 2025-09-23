import { useEffect, useState } from "react"
import { getStatusOptions } from "../services/statusService"
import { updateLead } from "../services/leadService"
import { getActiveLeads } from "../services/leadService"
import { getServiceEvents, createServiceData } from "../services/servicesService"


const ActiveLead = ({ activeLead, setActiveLeads, currentAgentId }) => {
    const [statusOptions, setStatusOptions] = useState([])
    const [serviceEvents, setServiceEvents] = useState([])
    const [selectedService, setSelectedService] = useState(0)
    const [addedTime, setAddedTime] = useState(0)
    const [nextFollowUp, setNextFollowUp] = useState("")

    const handleStatusChange = async (event) => {
        const statusId = parseInt(event.target.value)

        await updateLead(activeLead.id, { ...activeLead, status: statusId })
        const activeLeadArray = await getActiveLeads()
        setActiveLeads(activeLeadArray)
    }
    const handleServiceChange = event => {
        setSelectedService(parseInt(event.target.value))
    }
    const handleAddedTime = event => {
        setAddedTime(parseInt(event.target.value))
    }
    const handleNextFollowUp = event => {
        setNextFollowUp(event.target.value)
    }
    useEffect(() => {
        getStatusOptions().then(setStatusOptions)
        getServiceEvents().then(setServiceEvents)

    }, [setStatusOptions, setServiceEvents])

    const handleClick = async (event) => {
        const missingFields = validateForm()
        if (missingFields.length > 0) {
            const fieldList = missingFields.join(", ")
            window.alert(`Please fill out the following required fields: ${fieldList}`)
            return
        }
        const services = {
            agentId: currentAgentId?.id || 0,
            leadId: activeLead.id,
            type: selectedService,
            timeSpent: addedTime
        }
        await Promise.all([
            createServiceData(services),
            updateLead(activeLead.id, { ...activeLead, followUpDate: nextFollowUp })
        ])


        const activeLeadArray = await getActiveLeads()
        setActiveLeads(activeLeadArray)

        setSelectedService(0)
        setAddedTime(0)
        setNextFollowUp("")
    }

    const validateForm = () => {
        const missingFields = []
        console.log(selectedService, selectedService === 0)
        if (selectedService === 0) {
            missingFields.push("Service")
        }
        if (addedTime === 0) {
            missingFields.push("Add Time")
        }
        if (nextFollowUp === "") {
            missingFields.push("Next Follow Up?")
        }
        return missingFields
    }







    return (
        <tr>
            <td>{activeLead.fullName}</td>
            <td>
                <select
                    name="service"
                    id="service"
                    value={selectedService}
                    onChange={handleServiceChange}
                >
                    <option
                        value="0"
                    >Choose Service</option>
                    {serviceEvents.map(serviceEvent => (
                        <option key={serviceEvent.id} value={serviceEvent.id}>
                            {serviceEvent.type}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    id="addTime"
                    type="number"
                    value={addedTime}
                    onChange={handleAddedTime} />
            </td>
            <td><input
                id="nextFollowUp"
                type="date"
                value={nextFollowUp}
                onChange={handleNextFollowUp}
                placeholder="Follow Up On?" />
            </td>
            <td><button onClick={handleClick}>Save</button></td>
            <td>{activeLead.initialTimeSpent}</td>
            <td>{activeLead.followUpDate}</td>
            <td>{activeLead.status.type}</td>
            <td>
                <fieldset>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={activeLead.status}
                        onChange={handleStatusChange}
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



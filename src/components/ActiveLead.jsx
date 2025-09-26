import { useEffect, useState } from "react"
import { getStatusOptions } from "../services/statusService"
import { updateLead } from "../services/leadService"
import { getActiveLeads } from "../services/leadService"
import { getServiceEvents, createServiceData } from "../services/servicesService"
import TotalTime from "./TotalTime"


const ActiveLead = ({ activeLead, setActiveLeads, currentAgentId }) => {
    const [statusOptions, setStatusOptions] = useState([])
    const [serviceEvents, setServiceEvents] = useState([])
    const [selectedService, setSelectedService] = useState(0)
    const [addedTime, setAddedTime] = useState(0)
    const [nextFollowUp, setNextFollowUp] = useState("")

    const handleStatusChange = async (event) => {
        const statusId = parseInt(event.target.value)

        await updateLead(activeLead.id, { ...activeLead, status: statusId })

        const activeLeadArray = await getActiveLeads(currentAgentId)
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

    const handleClick = async () => {
        const missingFields = validateForm()
        if (missingFields.length > 0) {
            const fieldList = missingFields.join(", ")
            window.alert(`Please fill out the following required fields: ${fieldList}`)
            return
        }
        const services = {
            agentId: currentAgentId || 0,
            leadId: activeLead.id,
            type: selectedService,
            timeSpent: addedTime
        }
        await Promise.all([
            createServiceData(services),
            updateLead(activeLead.id, { ...activeLead, followUpDate: nextFollowUp })
        ])

        const activeLeadArray = await getActiveLeads(currentAgentId)
        setActiveLeads(activeLeadArray)

        setSelectedService(0)
        setAddedTime(0)
        setNextFollowUp("")
    }

    const validateForm = () => {
        const missingFields = []
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
            <td data-label="Full Name">{activeLead.fullName}</td>
            <td data-label="Choose Service">
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
            <td data-label="Time Spent Today">
                <input
                    id="addTime"
                    type="number"
                    value={addedTime}
                    onChange={handleAddedTime} />
            </td>
            <td data-label="Next Follow Up?"><input
                id="nextFollowUp"
                type="date"
                value={nextFollowUp}
                onChange={handleNextFollowUp}
                placeholder="Follow Up On?" />
            </td>
            <td><button onClick={handleClick}>Save</button></td>
            <td data-label="Total Time Spent">
                <TotalTime
                    leadId={activeLead.id}
                    key={`${activeLead.id}-${selectedService}`}
                />
            </td>
            <td data-label="Follow Up On">
                {activeLead.followUpDate &&
                    (() => {
                        const [year, month, day] = activeLead.followUpDate.split('-');
                        return `${month}/${day}/${year}`;
                    })()
                }
            </td>
            <td data-label="Status">
                <fieldset className="status-input">
                    <label className="sr-only" htmlFor="status">Status</label>
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



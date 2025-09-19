import { useState, useEffect } from "react"
import { createLead } from "../services/leadService.js"

const AddALead = ({ currentAgentId }) => {
    const initialState = {
        agentId: currentAgentId?.id || 0,
        fullName: "",
        initialTimeSpent: "",
        followUpDate: "",
        status: "active",
        createdAt: new Date()
    }
    const [lead, setLead] = useState(initialState)
    useEffect(() => {

        setLead(prevLead => ({
            ...prevLead,
            status: "active",
            agentId: currentAgentId?.id || 0,

        }))
    }, [currentAgentId])

    const validateForm = () => {
        const missingFields = []

        if (!lead.fullName.trim()) {
            missingFields.push("Full Name")
        }
        if (!lead.initialTimeSpent) {
            missingFields.push("Time Spent")
        }
        if (!lead.followUpDate) {
            missingFields.push("Follow Up Date")
        }
       
        return missingFields
    }

    const handleFullNameChange = (event) => {
        setLead({
            ...lead,           // Keep all existing properties
            fullName: event.target.value  // Update just this one
        })
    }
    const handleInitialTimeSpentChange = (event) => {
        setLead({
            ...lead,           // Keep all existing properties
            initialTimeSpent: event.target.value  // Update just this one
        })
    }
    const handleFollowUpDateChange = (event) => {
        setLead({
            ...lead,           // Keep all existing properties
            followUpDate: event.target.value  // Update just this one
        })
    }
    const handleClick = async (event) => {
        event.preventDefault()
        const missingFields = validateForm()
        if (missingFields.length > 0) {
            const fieldList = missingFields.join(", ")
            window.alert(`Please fill out the following required fields: ${fieldList}`)
            return
        }
        const currentDate = new Date();
        setLead(prevLead => ({
            ...prevLead,
            createdAt: currentDate
        }))

        createLead(lead)
        setLead(initialState)
    }

    return (
        <div>
            <h1>Who are you adding to your lead list today?</h1>
            <form>
                <fieldset>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={lead.fullName}
                        onChange={handleFullNameChange}
                        placeholder="Enter full name"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="initialTimeSpent">Time Spent</label>
                    <input
                        id="initialTimeSpent"
                        type="number"
                        value={lead.initialTimeSpent}
                        onChange={handleInitialTimeSpentChange}
                        placeholder="Enter Initial Time Spent"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="followUpDate">Follow Up On?</label>
                    <input
                        id="followUpDate"
                        type="date"
                        value={lead.followUpDate}
                        onChange={handleFollowUpDateChange}
                        placeholder="Follow Up On?"
                    />
                </fieldset>
                <button onClick={handleClick}>Add Lead</button>
            </form>
            <p>Current lead: {JSON.stringify(lead, null, 2)}</p>
        </div>
    )
}

export default AddALead






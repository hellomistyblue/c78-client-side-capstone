import { getLeadsById } from "../services/leadService"
import { useState, useEffect } from "react"
import { getServicesByLeadId } from "../services/servicesService"

const TotalTime = ({ leadId }) => {
    const [totalTime, setTotalTime] = useState(0)
    

    useEffect(() => {
        const calculateTime = async () => {
            const currentLead = await getLeadsById(leadId)
            const currentLeadInitialTime = parseInt(currentLead[0]?.initialTimeSpent)
            const services = await getServicesByLeadId(leadId)
            const totalServiceTime = services.reduce((sum, item) => sum + item.timeSpent, 0)
            const totalTime = currentLeadInitialTime + totalServiceTime
            setTotalTime(totalTime)
        }
        calculateTime()
    }, [leadId])

    return (
        <>{totalTime}</>
    )
}

export default TotalTime






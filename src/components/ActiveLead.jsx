const ActiveLead = ({activeLead}) => {
    return (
        <tr><td>{activeLead.fullName}</td><td>{activeLead.initialTimeSpent}</td><td>{activeLead.followUpDate}</td></tr>
    )
}

export default ActiveLead


                        
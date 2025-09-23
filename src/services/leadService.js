export const createLead = (lead) => {
  return fetch("http://localhost:8088/leads", 
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  }).then((res) => res.json())
}

export const getActiveLeads = () => {
    return fetch(`http://localhost:8088/leads?status=1`).then((res) =>
        res.json()
    );
};

export const updateLead = (leadId, leadData) => {
  return fetch(`http://localhost:8088/leads/${leadId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  }).then((res) => res.json())
}

export const getInactiveLeads = () => {
    return fetch(`http://localhost:8088/leads?status=2`).then((res) =>
        res.json()
    );
};

export const deleteLead = async (leadId) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    const response = await fetch(`http://localhost:8088/leads/${leadId}`, deleteOptions)}
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
    return fetch(`http://localhost:8088/leads?status=active`).then((res) =>
        res.json()
    );
};
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
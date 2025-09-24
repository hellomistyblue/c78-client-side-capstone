export const getServiceEvents = () => {
    return fetch(`http://localhost:8088/serviceEvents`).then((res) =>
        res.json()
    );
};

export const createServiceData = (serviceData) => {
  return fetch("http://localhost:8088/services", 
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  }).then((res) => res.json())
};

export const getServicesByLeadId = (leadId) => {
  return fetch(`http://localhost:8088/services?leadId=${leadId}`).then((res) =>
        res.json()
    );
}


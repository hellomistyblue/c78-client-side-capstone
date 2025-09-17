export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/agents?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (customer) => {
  return fetch("http://localhost:8088/agents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json())
}

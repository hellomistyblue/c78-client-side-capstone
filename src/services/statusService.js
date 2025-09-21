export const getStatusOptions = () => {
    return fetch(`http://localhost:8088/status`).then((res) =>
        res.json()
    );
};


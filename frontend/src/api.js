const API_URL = "http://127.0.0.1:8000/api/auth/";

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    return response.json();
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
};

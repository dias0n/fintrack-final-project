import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

export const register = async (username, email, password) => {
    return axios.post(`${API_URL}register/`, {
        username,
        email,
        password
    });
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка авторизации:", error.response?.data || error.message);
        return { error: error.response?.data || "Ошибка запроса" };
    }
};

export const getProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Нет токена!");
        return null;
    }

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
        return null;
    }
};




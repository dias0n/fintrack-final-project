import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            console.log("Server response:", response);

            if (response.access) {
                localStorage.setItem("accessToken", response.access);
                localStorage.setItem("refreshToken", response.refresh);
                console.log("Token saved!");
                navigate("/profile");
            } else {
                setMessage("Incorrect login or password!");
                setUsername("");
                setPassword("");
            }
        } catch (error) {
            console.error("Authorization error:", error);
            setMessage("Server error. Try again later.");
            setUsername("");
            setPassword("");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Fintrack</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Войти</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            setMessage("Registration success! Now you can log in.");
            setUsername("");
            setEmail("");
            setPassword("");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Server error. Please check your entered data.");
        }
    };

    console.log("Register component rendered");
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Registration</h2>
                {message && <div className="alert alert-info">{message}</div>}
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
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-success w-100">Register</button>
                </form>
                <p className="text-center mt-3">
                Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Register;


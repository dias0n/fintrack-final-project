import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Welcome!</h2>
            {token ? (
                <>
                    <p>You are logged in!</p>
                    <button onClick={handleLogout}>Exit</button>
                </>
            ) : (
                <>
                    <p>Select an action:</p>
                    <Link to="/login">
                        <button>Log in</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Home;


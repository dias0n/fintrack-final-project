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
            <h2>Добро пожаловать!</h2>
            {token ? (
                <>
                    <p>Вы вошли в систему</p>
                    <button onClick={handleLogout}>Выйти</button>
                </>
            ) : (
                <>
                    <p>Выберите действие:</p>
                    <Link to="/login">
                        <button>Войти</button>
                    </Link>
                    <Link to="/register">
                        <button>Зарегистрироваться</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Home;


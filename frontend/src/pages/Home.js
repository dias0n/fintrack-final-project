import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Добро пожаловать!</h2>
            <p>Выберите действие:</p>
            <Link to="/login">
                <button>Войти</button>
            </Link>
            <Link to="/register">
                <button>Зарегистрироваться</button>
            </Link>
        </div>
    );
};

export default Home;

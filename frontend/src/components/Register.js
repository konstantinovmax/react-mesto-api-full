import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    const [userData, setUserData] = React.useState({ email: '', password: '' });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = userData;
        props.onRegister(email, password);
    }

    return (
        <section className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <h2 className="authorization__title">Регистрация</h2>
                <input
                id="email"
                name="email"
                className="authorization__input"
                type="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="off"
                required
                />
                <input
                id="password"
                name="password"
                className="authorization__input"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Пароль"
                required
                />
                <button className="authorization__submit-button" type="submit">Зарегистрироваться</button>
                <div className="authorization__question-container">
                    <p className="authorization__question-text">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="authorization__link-to-signin">Войти</Link>
                </div>
            </form>
        </section>
    );
}

export default withRouter(Register);

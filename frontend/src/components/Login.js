import React from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
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
        props.onLogin(email, password);
    }

    return (
        <section className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <h2 className="authorization__title">Вход</h2>
                <input
                id="input-user-email"
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
                id="input-user-password"
                name="password"
                className="authorization__input"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Пароль"
                minLength="8"
                maxLength="16"
                required
                />
                <button className="authorization__submit-button" type="submit">Войти</button>
            </form>
        </section>
    );    
}

export default withRouter(Login);

import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
    let { email } = props.userEmail;
    
    return (
        <Switch>
            <Route exact path="/">
                <div className={`header__user-container-mobile ${props.isOpen && 'header__user-container-mobile_is-open'}`}>
                    <p className="header__user-data">{email}</p>
                    <button className="header__logout" onClick={props.onSignOut}>Выйти</button>
                </div>
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container">
                        <p className="header__user-data">{email}</p>
                        <button className="header__logout" onClick={props.onSignOut}>Выйти</button>
                    </div>
                    <button className="header__menu-burger-container" type="button" onClick={props.isOpen ? props.onClose : props.onOpenMobileMenu}>
                        <span className={`header__menu-burger-button ${props.isOpen && 'header__menu-burger-button_close'}`} />
                    </button>
                </header>
            </Route>
            <Route path="/sign-up">
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container header__user-container_not-logged-in">
                        <Link to="/sign-in" className="header__authorization">Войти</Link>
                    </div>
                </header>
            </Route>
            <Route path="/sign-in">
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип сервиса Mesto" />
                    <div className="header__user-container header__user-container_not-logged-in">
                        <Link to="/sign-up" className="header__authorization">Регистрация</Link>
                    </div>
                </header>
            </Route>
        </Switch>
    );
}

export default Header;

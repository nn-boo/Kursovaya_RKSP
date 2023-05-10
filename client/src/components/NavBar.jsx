import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import mainLogo from "../static/logo.png";
import jwt_decode from 'jwt-decode';
import '../static/css/main.css';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    let email = 'Unauthorized';
    try {
        email = jwt_decode(localStorage.getItem('token')).email;
    } catch (e) {
        //заглушка от неавторизованных пользователей
    }

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setRole("USER");
    }

    return (
        <nav className="p-3 navbar navbar-light bg-light navbar-expand-lg border-bottom border-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-start" id="navbarNavAltMarkup">
                <div className='navbar-nav'>
                    {!user.isAuth &&
                        <NavLink to='/login' className={'text-decoration-none'}>
                            <span className="nav-item nav-link text-black">
                                Войти
                            </span>
                        </NavLink>
                    }
                    {user.isAuth &&
                        <div className='nav-link dropdown-toggle text-black' id='userDropdown' role='button'
                             data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            {email}
                        </div>}
                    {user.isAuth && <div className="dropdown-menu bg-light" aria-labelledby='userDropdown'>
                        {user.isAdmin &&
                            <NavLink to='/admin' className={'text-decoration-none'}>
                            <span className="dropdown-item nav-link text-black">
                                Админ
                            </span>
                            </NavLink>
                        }
                        {user.isAuth &&
                            <NavLink to='/win' className={'text-decoration-none'}>
                            <span className="dropdown-item nav-link text-black">
                                Выигранные лоты
                            </span>
                            </NavLink>
                        }
                        <span className="dropdown-item nav-link text-black" onClick={logOut}>Выйти</span>
                    </div>}
                    <NavLink to='/lots' className={'text-decoration-none'}>
                    <span className="nav-item nav-link text-black">
                        Лоты
                    </span>
                    </NavLink>
                    <NavLink to='/faq' className={'text-decoration-none'}>
                    <span className="nav-item nav-link text-black">
                        FAQ
                    </span>
                    </NavLink>
                </div>
            </div>
            <NavLink className="navbar-brand" to='/'>
                <img src={mainLogo} width="30" height="30"
                     className="d-inline-block align-top" alt="logo"/>
                TheBestAuction
            </NavLink>
        </nav>
    );
});

export default NavBar;
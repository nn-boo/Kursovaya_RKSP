import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigation = useNavigate();
    const isLogin = location.pathname === '/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMes, setAlertMes] = useState('');

    const universal = async (e) => {
        e.preventDefault();
        try{
            let data;
            if (isLogin) {
                data = await login(email, password);
                user.setRole(data.role);
            }
            else{
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigation('/');
        } catch (e) {
            setAlertMes(e.response.data.message);
            setAlert(true);
        }
    };
    return (
        <div className='container d-flex justify-content-center align-items-center p-4'>

                <form className='d-flex flex-column'>

                    {alert &&
                        <div className="alert alert-light text-danger text-black" role="alert">
                            {alertMes}
                        </div>
                    }

                    <h3 className=''>{isLogin && 1 ? 'Войти' : 'Регистрация'}</h3>
                    <input type='email' onChange={e => setEmail(e.target.value)} value={email} className='mt-2 form-control' placeholder='Введите email..'/>
                    <input type='password' onChange={e => setPassword(e.target.value)} value={password} className='mt-2 form-control' placeholder='Введите пароль..'/>

                    {isLogin &&
                    <div className="mt-3 btn-group" aria-label="Basic example">
                        <button onClick={universal} className='btn btn-light border-dark'>Войти</button>
                        <button className='btn btn-light border-dark'><NavLink className='text-decoration-none text-black' to='/registration'>Зарегистрироваться</NavLink></button>
                    </div>
                    }
                    {!isLogin &&
                        <button onClick={universal} className='mt-3 btn btn-light border-dark'>Зарегистрироваться</button>
                    }
                </form>

        </div>
    );
});

export default Auth;
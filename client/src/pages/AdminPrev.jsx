import React from 'react';
import {NavLink} from "react-router-dom";

const AdminPrev = () => {
    return (
        <div className='container-fluid'>
            <h1 className='text-center mt-3'>Панель администрирования</h1>
            <div className="btn-group d-flex text-center mx-auto mt-5" role="group"
                 aria-label="Basic mixed styles example">
                <NavLink className={'text-decoration-none text-black h5 btn btn-light border-dark border-2'} to='/admin/lots'>
                    Лоты
                </NavLink>
                <NavLink className={'text-decoration-none text-black h5 btn btn-light border-dark border-2'} to='/admin/users'>
                    Пользователи
                </NavLink>
            </div>
        </div>
    );
};

export default AdminPrev;
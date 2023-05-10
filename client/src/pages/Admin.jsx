import React, {useEffect, useState} from 'react';
import {getAll} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
import CreateUser from "../components/modals/createUser";
import DeleteUser from "../components/modals/deleteUser";
import UpdateUser from "../components/modals/updateUser";
import {observer} from "mobx-react-lite";

const Admin = observer(() => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [createVisible, setCreateVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            getAll().then(data => {
                setUsers(data);
            }).finally(() => setLoading(false))
        }, 1000);}, []);


    const reload = async () => {
        setLoading(true);
        setTimeout(() => {
            getAll().then(data => {
                setUsers(data);
            }).finally(() => setLoading(false))
        }, 1000);
    }

    if (loading) {
        return(
            <div className='d-flex align-items-center'>
                <strong>Loading...</strong>
                <Spinner className='ms-auto' role='status' />
            </div>
        );
    }

    return (
        <div className='container-fluid'>
            <h3 className='mt-3 text-center'>Таблица пользователей</h3>
            <div className='d-flex flex-column'>
                <div className='table-responsive-xl'>
                    <table className='table table-light border-dark table-bordered text-center'>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Почта</th>
                            <th scope="col">Роль</th>
                            <th scope="col">Пароль</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.data.map(function (data, index){
                            return(
                                <tr key={index}>
                                    <th scope='row'>{data.id}</th>
                                    <th scope='row'>{data.email}</th>
                                    <th scope='row'>{data.role}</th>
                                    <th scope='row'>{data.password}</th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="btn-group mt-3 mb-5 mb-4 ms-auto" role="group" aria-label="Basic example">
                    <button onClick={() => setCreateVisible(true)} type="button" className="border-dark border-2 btn btn-light">Создать</button>
                    <button onClick={() => setDeleteVisible(true)} type="button" className="border-dark border-2 btn btn-light">Удалить</button>
                    <button onClick={() => setUpdateVisible(true)} type="button" className="border-dark border-2 btn btn-light">Обновить</button>
                </div>

            </div>
            <CreateUser reload={reload} show={createVisible} onHide={() => setCreateVisible(false)}/>
            <DeleteUser reload={reload} users={users.data} show={deleteVisible} onHide={() => setDeleteVisible(false)}/>
            <UpdateUser reload={reload} users={users.data} show={updateVisible} onHide={() => setUpdateVisible(false)}/>
        </div>
    );
});

export default Admin;
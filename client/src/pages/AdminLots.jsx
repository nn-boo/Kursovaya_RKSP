import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getAllLots} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
import CreateLot from "../components/modals/createLot";
import { Buffer } from 'buffer';
import DeleteLot from "../components/modals/deleteLot";
import UpdateLot from "../components/modals/updateLot";

const AdminLots = observer(() => {
    const [loading, setLoading] = useState(true);
    const [lots, setLots] = useState([]);
    const [createVisible, setCreateVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    function convertBufferToStr(lots){
        for (let i = 0; i < lots.data.length; i++) {
            const buffer = Buffer.from(lots.data[i].image);
            lots.data[i].image = buffer.toString();
        }
        return lots;
    }

    useEffect(() => {
        setTimeout(() => {
            getAllLots().then(data => {
                let lots = convertBufferToStr(data);
                setLots(lots);
            }).finally(() => setLoading(false))
        }, 1000);}, []);


    const reload = async () => {
        setLoading(true);
        setTimeout(() => {
            getAllLots().then(data => {
                let lots = convertBufferToStr(data);
                setLots(lots);
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
            <h3 className='mt-3 text-center'>Таблица лотов</h3>
            <div className='d-flex flex-column'>
                <div className='table-responsive-xl'>
                    <table className='table table-light border-dark table-bordered text-center'>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Фото</th>
                            <th scope="col">Начальная цена</th>
                            <th scope="col">Текущая цена</th>
                            <th scope="col">Время начала</th>
                            <th scope="col">Время конца</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lots.data.map(function (data, index){
                            return(
                                <tr key={index}>
                                    <th scope='row'>{data.id}</th>
                                    <th scope='row'>{data.name}</th>
                                    <th scope='row'>{data.description}</th>
                                    <th scope='row'><img className='img-thumbnail' src={data.image} alt='lotimg'/></th>
                                    <th scope='row'>{data.startPrice}</th>
                                    <th scope='row'>{data.currentPrice}</th>
                                    <th scope='row'>{data.startTime}</th>
                                    <th scope='row'>{data.endTime}</th>
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
            <CreateLot reload={reload} show={createVisible} onHide={() => setCreateVisible(false)}/>
            <DeleteLot reload={reload} lots={lots.data} show={deleteVisible} onHide={() => setDeleteVisible(false)}/>
            <UpdateLot reload={reload} lots={lots.data} show={updateVisible} onHide={() => setUpdateVisible(false)}/>
        </div>
    );
});

export default AdminLots;
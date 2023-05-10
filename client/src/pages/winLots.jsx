import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Buffer} from "buffer";
import {getWinLot} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "../index";

const WinLots = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [lots, setLots] = useState([]);

    function convertBufferToStr(lots) {
        for (let i = 0; i < lots.data.length; i++) {
            const buffer = Buffer.from(lots.data[i].image);
            lots.data[i].image = buffer.toString();
        }
        return lots;
    }

    useEffect(() => {
        setTimeout(() => {
            getWinLot(user.user.id).then(data => {
                let lots = convertBufferToStr(data);
                setLots(lots);
            }).finally(() => setLoading(false))
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className='d-flex align-items-center'>
                <strong>Loading...</strong>
                <Spinner className='ms-auto' role='status'/>
            </div>
        );
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center mt-3'>Ваши победы</h3>
            <div className='d-flex flex-column'>
                <div className='table-responsive-xl'>
                    <table className='table table-light'>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Наименование</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Фото</th>
                            <th scope="col">Итоговая стоимость</th>
                            <th scope="col">Время победы</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lots.data.map(function (data, index) {
                            return (
                                <tr key={index}>
                                    <th scope='row'>{data.id}</th>
                                    <th scope='row'>{data.name}</th>
                                    <th scope='row'>{data.description}</th>
                                    <th scope='row'><img className='img-thumbnail' src={data.image} alt='lotimg'/></th>
                                    <th scope='row'>{data.currentPrice}</th>
                                    <th scope='row'>{data.endTime}</th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

export default WinLots;
import React, {useContext, useEffect, useState} from 'react';
import {Buffer} from "buffer";
import {doBetLot, getAllLots} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import '../static/css/main.css';
import {Context} from "../index";
import 'dayjs/locale/ru'
import dayjs from "dayjs";

require('dayjs/locale/es')
var relativeTime = require('dayjs/plugin/relativeTime')


const Lots = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [lots, setLots] = useState([]);
    dayjs.locale('ru');
    dayjs.extend(relativeTime);

    const bet = async (lotId, e) => {
        e.preventDefault();
        const step = document.getElementById(lotId + '').value;
        if (!step || step < 1)
            return -1;
        else {
            await doBetLot(Number(lotId), step, user.user.id);
        }
    }

    function prepareLots(lots) {
        for (let i = 0; i < lots.data.length; i++) {
            const buffer = Buffer.from(lots.data[i].image);
            lots.data[i].image = buffer.toString();
            lots.data[i].beforeTime = (new Date(lots.data[i].endTime) < new Date());
            lots.data[i].isGoing = (new Date(lots.data[i].startTime) < new Date() && new Date(lots.data[i].endTime) > new Date());
            lots.data[i].isYours = (lots.data[i].userId === user.user.id);
        }
        return lots;
    }

    useEffect(() => {
        setTimeout(() => {
            getAllLots().then(data => {
                let lots = prepareLots(data);
                setLots(lots);
            }).finally(() => setLoading(false))
        }, 1000);
    });

    // (dayjs(data.endTime).diff(new Date(), 'hours', false))

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
            <h3 className='mt-3 text-center'>Доступные лоты</h3>
            <div className='d-flex justify-content-around flex-wrap'>
                {lots.data.map(function (data, index) {
                    if (!data.beforeTime){
                        return (
                            <div key={index} className="card mt-3 justify-content-around border-dark p-2">
                                <img className="card-img-top img-lot rounded" src={data.image} alt="Cardimagecap"/>
                                <div className="card-body card-fix">
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text">{data.description}</p>
                                    <hr/>
                                    <h6 className='card-title'>Начальная цена: {data.startPrice}</h6>
                                    <h6 className='card-title'>Текущая цена: {data.currentPrice || 'Ставок нет'}</h6>
                                    <h6 className='card-title'>Цена ставки: {data.step}</h6>
                                    {data.isGoing &&
                                        <div>
                                            <p className="card-text text-success">Торги начались <br/>До конца
                                                торгов: {dayjs().to(data.endTime, true)}</p>
                                        </div>
                                    }

                                    {!data.isGoing &&
                                        <p className="card-text text-danger">Торги еще не начались</p>}
                                    {data.isYours && <p className="card-text text-black bg-success bg-opacity-50 text-center rounded mt-2">Вы выигрываете в торгах</p>}
                                    {!data.isYours &&
                                        <p className="card-text text-black bg-danger bg-opacity-50 text-center rounded mt-2">Вы не выигрываете в торгах</p>}
                                    <p></p>
                                    {data.isGoing && user.isAuth &&
                                        <div className="input-group mb-3">
                                            <input id={data.id} type="number" className="form-control"
                                                   placeholder="Поднятие в ходах"
                                                   aria-label=""
                                                   aria-describedby="basic-addon1"/>
                                            <div className="input-group-prepend">
                                                <button className="btn btn-outline-warning text-black" onClick={e => bet(data.id, e)}>Поставить
                                                </button>
                                            </div>

                                        </div>}

                                </div>
                            </div>
                        )} else {
                        return '';
                    }
                })}
            </div>
        </div>
    );
});

export default Lots;
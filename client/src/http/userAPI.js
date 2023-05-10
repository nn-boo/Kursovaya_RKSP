import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
export const check = async () => {
    const {data} = await $authHost.post('api/user/auth', );
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const getAll = async () => {
    const users = await $authHost.get('/api/user/getAll');
    return users;
}

export const deleteOne = async (userId) => {
    return await $authHost.post('/api/user/delete', {id: userId});
}

export const updateOne = async (id, email, role, password) => {
    return await $authHost.patch('/api/user/patch', {id, email, role, password})
}

export const addOne = async (email, password, role) => {
    const {data} = await $host.post('api/user/registration', {email, password, role});
    return data;
}

export const getAllLots = async () => {
    const lots = await $authHost.get('/api/lot/get', );
    return lots;
}

export const addLotOne = async (name, description, image, startTime, endTime, startPrice, step) => {
    const {data} = await $authHost.post('/api/lot/create', {name, description, image, startTime, endTime, startPrice, step});
    return data;
}

export const deleteLotOne = async (lotId) => {
    return await $authHost.post('/api/lot/delete', {lotId: lotId});
}

export const updateLotOne = async (lotId, name, description, image, startTime, endTime, startPrice, step) => {
    const {data} = await $authHost.post('/api/lot/update', {lotId, name, description, image, startTime, endTime, startPrice, step});
    return data;
}

export const doBetLot = async (lotId, step, userId) => {
    const {data} = await $authHost.post('/api/lot/bet', {id: lotId, step, userId});
    return data;
}

export const getWinLot = async (userId) => {
    const data = await $authHost.post('/api/lot/win', {userId});
    return data;
}
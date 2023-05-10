import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore{
    constructor() {
        this._isAuth = false;
        this._user = {};
        try{
            this._role = jwt_decode(localStorage.getItem('token')).role;
        } catch (e){
            this._role = null;
        }
        makeAutoObservable(this);
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    setRole(role){
        this._role = role;
    }

    setUser(user){
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }

    get user(){
        return this._user;
    }

    get role(){
        return this._role;
    }

    get isAdmin(){
        return this._role === 'ADMIN';
    }
}
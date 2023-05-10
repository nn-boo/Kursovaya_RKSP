import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import  'bootstrap/dist/js/bootstrap.bundle';
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Footer from "./components/Footer";

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            }).finally(() => setLoading(false))
        }, 1000);
    }, []);

    if (loading) {
        return(
            <div className='d-flex align-items-center'>
                <strong>Loading...</strong>
                <Spinner className='ms-auto' role='status' />
            </div>
        );
    }
  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
});

export default App;

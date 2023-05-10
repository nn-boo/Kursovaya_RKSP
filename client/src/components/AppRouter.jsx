import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import Greet from "../pages/Greet";
import Auth from "../pages/Auth";
import Admin from "../pages/Admin";
import {Context} from "../index";
import AdminPrev from "../pages/AdminPrev";
import AdminLots from "../pages/AdminLots";
import {observer} from "mobx-react-lite";
import FAQ from "../pages/FAQ";
import Lots from "../pages/Lots";
import WinLots from "../pages/winLots";

const AppRouter = observer( () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            <Route path='*' element={<Greet/>}/>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/registration' element={<Auth/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/lots' element={<Lots/>}/>
            {user.isAuth && <Route path='/win' element={<WinLots/>}/>}
            {user.isAdmin && <Route path='/admin' element={<AdminPrev/>}/>}
            {user.isAdmin && <Route path='/admin/users' element={<Admin/>}/>}
            {user.isAdmin && <Route path='/admin/lots' element={<AdminLots/>}/>}
        </Routes>
    );
});

export default AppRouter;
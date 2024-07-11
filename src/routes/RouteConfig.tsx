import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import SuperLogin from '../pages/SuperLogin';
import SuperRegister from '../pages/SuperRegister';
import UnknownRoute from '../pages/UnknownRoute';

export default function RouteConfig() {
    return(
        <Routes>
            <Route element={<Login />} path='/' />
            <Route element={<SuperLogin />} path='/super-login' />
            <Route element={<SuperRegister />} path='/register' />
            <Route element={<PrivateRoute><Home /></PrivateRoute>} path='/home' />
            <Route element={<UnknownRoute />} path='*' />
        </Routes>
    )
}
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import SuperLogin from '../pages/SuperLogin';

export default function RouteConfig() {
    return(
        <Routes>
            <Route element={<Login />} path='/' />
            <Route element={<SuperLogin />} path='/super-login' />
            <Route element={<Register />} path='/register' />
            <Route element={<PrivateRoute><Home /></PrivateRoute>} path='/home' />
            <Route element={<PrivateRoute><div>ROTA NÃO DISPONÍVEL</div></PrivateRoute>} path='*' />
        </Routes>
    )
}
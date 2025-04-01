import { Route, Routes } from "react-router-dom";

import GiftsDashboard from "../pages/GiftsDashboard";
import UsersDashboard from "../pages/UsersDashboard";
import GiftsRegister from "../pages/GiftRegister";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Private from "./Private";

function RoutesApp() {
    return(
        <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/register" element={<SignUp />}/>

            {/**Rotas privada */}
            <Route path="/gifts/dashboard" element={<Private> <GiftsDashboard /> </Private>} />
            <Route path="/users/dashboard" element={<Private> <UsersDashboard /> </Private>} />
            <Route path="/profile" element={<Private> <Profile /> </Private>} />
            <Route path="/gifts/new" element={<Private> <GiftsRegister /> </Private>} />
            <Route path="/gifts/new/:id" element={<Private> <GiftsRegister /> </Private>} />
            <Route path="*" element={<div> Rota não encontrada </div>} />
        </Routes>
    );
}

export default RoutesApp;
import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Layout from "../Layout/Layout";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Greetings from "../../HomeArea/Greetings/Greetings";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/greetings" element={<Greetings />} />
            <Route path="/home" element={<Home />} />
            <Route path="/site" element={<Layout />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/greetings" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

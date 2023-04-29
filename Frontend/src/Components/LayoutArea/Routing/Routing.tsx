import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Greetings from "../../HomeArea/Greetings/Greetings";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import AddVacation from "../../DataArea/AddVacation/AddVacation";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/greetings" element={<Greetings />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:vacationId" element={<EditVacation />} />
            <Route path="/new" element={<AddVacation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/greetings" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

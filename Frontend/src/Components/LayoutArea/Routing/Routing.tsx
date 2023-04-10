import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Layout from "../Layout/Layout";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/site" element={<Layout />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

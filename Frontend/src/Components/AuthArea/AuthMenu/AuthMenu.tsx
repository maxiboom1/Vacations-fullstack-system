import { NavLink } from "react-router-dom";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    return (
        <div className="AuthMenu">
			<NavLink to="/register">Register</NavLink>
            <span> | </span>
			<NavLink to="/Login">Login</NavLink>
            <span> | </span>
			<NavLink to="/logout">Logout</NavLink>
        </div>
    );
}

export default AuthMenu;

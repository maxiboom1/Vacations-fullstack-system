import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import { AuthActionType, authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {
    
    const navigate = useNavigate();

    function logout(){
        authStore.dispatch({type:AuthActionType.Logout});
        navigate("/home");
    }
    return (    
        
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">List</NavLink>
            <span> | </span>
			<NavLink to="/insert">Insert</NavLink>
            <span> | </span>
			<button onClick={logout}>Logout</button>
        </div>
        
    );
}

export default Menu;

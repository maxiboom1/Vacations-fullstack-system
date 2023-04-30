import "./Menu.css";
import logo from"../../../Assets/Logo/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthActionType, authStore } from "../../../Redux/AuthState";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";

function Menu():JSX.Element {
  
  const user = authStore.getState().user;

  enum MenuItems {LOGIN = "Login", LOGOUT = "Logout", ADD = "Add", REGISTER= "Register"};
  const navigate = useNavigate();
  const menuEvents = {
    login: () => navigate("/login"),
    logout: ()=> {
      authStore.dispatch({type:AuthActionType.Logout});
      vacationsStore.dispatch({type:VacationsActionType.DeleteVacations});
      navigate("/greetings");
    },
    register: () => navigate("/register"),
    add: ()=> navigate("/new"),

  }
  
  const handleMenuClick = (event:string) => {menuEvents[event.toLowerCase() as keyof typeof menuEvents]()}

  return (
    <div className="Menu">
      <div>
        <img src={logo} alt="" />
      </div>
      
      <div className="menuItems">
        {user && <span className="userWelcome">Welcome, {user.firstName}!</span>}
        {user?.roleId === 1 && <span onClick={()=> handleMenuClick(MenuItems.ADD)}>Add</span>}
        {!user && <span onClick={()=> handleMenuClick(MenuItems.LOGIN)}>Login</span> }       
        {!user && <span onClick={()=> handleMenuClick(MenuItems.REGISTER)}>Register</span>}
        {user && <span onClick={()=> handleMenuClick(MenuItems.LOGOUT)}>Logout</span>}

      </div>
    </div>
  );
}

export default Menu;

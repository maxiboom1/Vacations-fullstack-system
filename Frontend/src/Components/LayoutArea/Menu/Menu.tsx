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
      navigate("/greetings");
      // Set delay to make sure that the components that are subscribed to vacations are destroyed
      setTimeout(()=>{vacationsStore.dispatch({type:VacationsActionType.DeleteVacations});},100);
    },
    register: () => navigate("/register"),
    add: ()=> navigate("/new"),
    home:()=> navigate("/home"),

  }
  
  const handleMenuClick = (event:string) => {menuEvents[event.toLowerCase() as keyof typeof menuEvents]()}

  return (
    <div className="Menu">
      <div className="siteLogo">
        <img src={logo} alt="" onClick={()=> menuEvents.home()} />
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

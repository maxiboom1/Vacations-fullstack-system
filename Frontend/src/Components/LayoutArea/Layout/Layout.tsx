import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import Home from "../../HomeArea/Home/Home";
import { authStore } from "../../../Redux/AuthState";

function Layout(): JSX.Element {
    
    const isLogged = authStore.getState().token;
    
    if(!isLogged) return <Home />;
        
    return (
        <div className="Layout">
            
            <Menu />
            <hr />
            <Routing />

        </div>
    );
}

export default Layout;

import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { authStore } from "../../../Redux/AuthState";

function Layout(): JSX.Element {
    
    // If user not logged in - render full-page Greeting page
    const [isTokenExists,setIsTokenExists] = useState<string>(authStore.getState().token);    
    
    useEffect(()=>{ 
        const unsubscribe = authStore.subscribe(()=>{
            setIsTokenExists(authStore.getState().token);
        });
        return () => unsubscribe();
    },[]);

    return (
        <div className="Layout">
           
           <header>
                <Menu /> 
            </header> 
            
            <main>
                <Routing />
            </main>
            
        </div>
    );
}

export default Layout;

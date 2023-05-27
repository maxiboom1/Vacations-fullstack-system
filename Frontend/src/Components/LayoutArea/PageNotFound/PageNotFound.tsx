import "./PageNotFound.css";
import facePalm from "../../../Assets/Images/facepalm.gif"
import { Link } from "@mui/material";

function PageNotFound(): JSX.Element {
    
    return (
        <div className="PageNotFound">
            <br /><br />
			<h1 className="move-from-left">Page not found.</h1>
            <h3 className="move-from-right">Page not found...</h3>
            <h3 className="move-from-left">Hey, page not found!</h3>
            <h5 className="move-from-right">Page not found?</h5>
            <h6 className="move-from-left">Page not found, huh??</h6>
            <br />
            <img width={300} className="fade-in" src={facePalm}></img>
            <br /><br />
            <Link href="/greetings" className="fadeInWithDelay" style={{ fontSize: "22px" }} variant="body2"> Eggg... just take me back 🤦‍♀️ </Link>
        </div>
    );
}

export default PageNotFound;

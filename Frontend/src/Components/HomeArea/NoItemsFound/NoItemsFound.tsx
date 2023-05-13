import "./NoItemsFound.css";
import noItemsGif from "../../../Assets/Images/no-items.gif";
 
function NoItemsFound(): JSX.Element {
    return (
        <div className="NoItemsFound">
            <br />
		    <h3>No vacations found 🤷‍♂️ </h3>	
            <h3>Try to release some filters...</h3>
            <img src={noItemsGif} width={300} alt="noItemsFoundGif" />
        </div>
    );
}

export default NoItemsFound;

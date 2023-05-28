import noItemsGif from "../../../Assets/Images/no-items.gif";
 
function NoItemsFound(): JSX.Element {
    return (
        <div className="NoItemsFound">
            <br />
		    <h4>No vacations found 🤷‍♂️ </h4>	
            <h4>Try to release some filters...</h4>
            <img src={noItemsGif} width={300} alt="noItemsFoundGif" />
        </div>
    );
}

export default NoItemsFound;

import "./Home.css";
import img from "../../../Assets/Images/home-image.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>Welcome to vacation mania web site! </h2>
            <h5>The world is reopening, which means it’s time to stop simply dreaming of travel and start exploring again. But where to go? After over a year spent sitting on unused miles, accumulated vacation days, and an ever-growing list of the places to visit next, picking a destination for that first big trip back out there can feel like a gargantuan task. Thankfully, we’ve put together our very own travel quiz to help you—with recommendations catered just for you. Seeking the great outdoors but also need a rental that will fit four generations of family members? No problem. Always wanted to become a solo traveler, yet unsure of where to start your adventures? We’ve got just the place. Desperately in need of a spa break? Not only can we relate, but we know the best new spas to send you to. Start answering the questions below to discover where you should travel next—and get inspired for the many more trips that will follow, too.</h5>
            <img src={img} alt="" />
        </div>
    );
}

export default Home;

import VacationModel from "../../../Models/VacationsModel";
import formatDate from "../../../Services/DateFormatter";
import "./CardUI.css";
import { Card, CardMedia, CardContent, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dataService from "../../../Services/DataService";

interface VacationProps { data:VacationModel; };

function CardUI(props: VacationProps): JSX.Element {
    
    const {data} = props; // extract vacation from VacationProps

    function handleLike(vacationId: number){
        
        // TODO: get current follow state: how? icon style or redux ?

        dataService.updateFollow(vacationId);

    }

    return (

        <div className="CardUI" >
            <Card className="CardElement" >
                
                <CardMedia component="img" height="170" image={data.imageUrl} alt={data.destination}/>

                <CardContent className="cardContent" style={{padding:"15px"}}>    
                    
                    {/* Header */}
                    <p className="cardHeader">{data.destination}</p>
                    
                    {/* Dates box */}
                    <Box className="dateBox">
                        <span className="startDate">{formatDate(data.startDate)} </span>
                        <ArrowForwardIcon />
                        <span className="endDate">{formatDate(data.endDate)}</span>
                    </Box>
                    
                    {/* Vacation description box*/}
                    <div className="descriptionBox">
                        <p className="descriptionText" >{data.description}</p>
                    </div>                   
                
                    <span className="vacationPrice">Only {data.price}$</span>
                    <FavoriteIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} className="likeIcon" onClick={() => handleLike(data.vacationId)}/>

                </CardContent>
            
            </Card>

        </div>
    
    );

}

export default CardUI;

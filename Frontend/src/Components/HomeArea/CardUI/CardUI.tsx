import VacationModel from "../../../Models/VacationsModel";
import formatDate from "../../../Services/DateFormatter";
import "./CardUI.css";
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface VacationProps { data:VacationModel; }

function CardUI(props: VacationProps): JSX.Element {
    
    const {data} = props; // extract vacation from VacationProps

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
                    <FavoriteIcon style={{color:"crimson", position: "absolute", top: "10px",left: "10px"}}/>

                </CardContent>
            
            </Card>

        </div>
    
    );

}

export default CardUI;

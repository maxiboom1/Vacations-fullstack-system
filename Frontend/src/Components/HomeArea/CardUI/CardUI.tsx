import VacationModel from "../../../Models/VacationsModel";
import formatDate from "../../../Services/DateFormatter";
import "./CardUI.css";
import { Card, CardMedia, CardContent, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dataService from "../../../Services/DataService";
import { vacationsStore } from "../../../Redux/VacationsState";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";

interface VacationProps { data:VacationModel; };

function CardUI(props: VacationProps): JSX.Element {
    
    
    const {data} = props; // extract vacation from VacationProps
    
    const [isFollowing, setIsFollowing] = useState<number>(data.isFollowing);
    
    useEffect(()=>{

        const unsubscribe = vacationsStore.subscribe(()=>{
            const localVacations = vacationsStore.getState().vacations;
            const index = localVacations.findIndex((v)=> v.vacationId === data.vacationId);
            setIsFollowing(localVacations[index].isFollowing);
        });
        
        return () => unsubscribe();

    },[data.isFollowing]);
   
    async function handleLike(vacationId: number){
        
        try{

            const v = vacationsStore.getState().vacations;

            const currentFollowState = v.find(v => v.vacationId === vacationId).isFollowing; 
            
            const newFollowState = currentFollowState === 1 ? 0 : 1;

            await dataService.updateFollow(vacationId, newFollowState);
                    
        }catch(e:any){
            
            notifyService.error(e);

        }

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
                    <div className="controlBar">
                        <span>{data.followersCount}</span>
                        <FavoriteIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} style={{color: isFollowing ===1 ? "red": "#da9c9cc9"}} className="likeIcon1" onClick={() => handleLike(data.vacationId)}/>
                    </div>
                </CardContent>
            
            </Card>

        </div>
    
    );

}

export default CardUI;


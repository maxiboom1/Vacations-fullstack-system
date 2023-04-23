import VacationModel from "../../../Models/VacationsModel";
import formatDate from "../../../Services/DateFormatter";
import "./CardUI.css";
import { Card, CardMedia, CardContent, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dataService from "../../../Services/DataService";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";

interface VacationProps { data:VacationModel; };

function CardUI(props: VacationProps): JSX.Element {
    
    
    const {data} = props; // extract vacation from VacationProps
    
    const [isFollowing, setIsFollowing] = useState<number>(props.data.isFollowing);
    
    //const [followersCount, setFollowersCount] = useState<number>(props.data.followersCount);

    useEffect(()=>{
        
        const unsubscribe = vacationsStore.subscribe(()=>{
            console.log('from subscribe');
            const index = vacationsStore.getState().vacations.findIndex((v)=> v.vacationId === props.data.vacationId);
            //setFollowersCount(vacationsStore.getState().vacations[index].followersCount);
            setIsFollowing(vacationsStore.getState().vacations[index].isFollowing);// We need to do that via subscribe
        });
        
        return () => unsubscribe();

    },[]);
    
    async function handleLike(vacationId: number){
        
        try{

            console.log('click');            
            const currentFollowState = vacationsStore.getState().vacations.find(v => v.vacationId === vacationId).isFollowing; 
            
            const newFollowState = currentFollowState === 1 ? 0 : 1;
            
            await dataService.updateFollow(vacationId, newFollowState);
            
            vacationsStore.dispatch({ type:VacationsActionType.UpdateFollow, payload:{vacationId, newFollowState} });
        
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

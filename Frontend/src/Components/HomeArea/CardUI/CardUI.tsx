import VacationModel from "../../../Models/VacationsModel";
import formatDate from "../../../Services/DateFormatter";
import "./CardUI.css";
import { Card, CardMedia, CardContent, Box, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dataService from "../../../Services/DataService";
import { vacationsStore } from "../../../Redux/VacationsState";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

interface VacationProps { data:VacationModel; };

function CardUI(props: VacationProps): JSX.Element {
    
    const user = authStore.getState().user;

    const navigate = useNavigate();

    const {data} = props; // extract vacation from VacationProps
    
    const [isFollowing, setIsFollowing] = useState<number>(data.isFollowing);

    const [followersCount, setFollowersCount] = useState<number>(data.followersCount);
    
    useEffect(()=>{

        const unsubscribe = vacationsStore.subscribe(()=>{
            const localVacations = vacationsStore.getState().vacations;
            const index = localVacations.findIndex((v)=> v.vacationId === data.vacationId);
            setIsFollowing(localVacations[index].isFollowing);
            setFollowersCount(localVacations[index].followersCount);
        });
        
        return () => unsubscribe();

    },[data.isFollowing, data.followersCount]);
   
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

    // MUI vertical menu
    const options = ['Edit','Delete',];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
    const handleClose = (option: string) => {
        setAnchorEl(null);
        
        if(option === "Delete"){
            // Do delete
        } 
        else if (option === "Edit"){
            navigate("/edit/" + data.vacationId);
        }
        
    };

    
    return (

        <div className="CardUI" >
            <Card className="CardElement" >
                
                <CardMedia className="cardImage" height={170} component="img" image={data.imageUrl} alt={data.destination}/>

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
                        <div className="likesBar">
                        <span>{followersCount}</span>
                        <FavoriteIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} style={{color: isFollowing ===1 ? "red": "#da9c9cc9"}} onClick={() => handleLike(data.vacationId)}/>
                        </div>
                        {user.roleId === 1 && <div>
                            <IconButton onClick={handleClick}> <MoreVertIcon /> </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}> 
                                {options.map((option) => ( <MenuItem key={option} onClick={(event) => handleClose(option)}> {option} </MenuItem> ))} 
                            </Menu>
                        </div> }

                    </div>
                </CardContent>
            
            </Card>

        </div>
    
    );

}

export default CardUI;

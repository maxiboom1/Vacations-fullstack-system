import "./Home.css";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { useNavigate } from "react-router-dom";
import { vacationsStore } from "../../../Redux/VacationsState";
import appConfig from "../../../Utils/AppConfig";
import { Checkbox, FormControlLabel, Pagination, Stack } from "@mui/material";

function Home(): JSX.Element {
    
    const navigate = useNavigate();     
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [activeFilters, setActiveFilters] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const cardsPerPage = 10;
    
    const calcPagination = () => {
        const endIndex = (currentPage * cardsPerPage);
        const startIndex = endIndex - cardsPerPage ; 
        return vacations.slice(startIndex, endIndex);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => { setCurrentPage(value); };
    
    // On page start data fetch
    useEffect(()=>{
        
        const localVacations = vacationsStore.getState().vacations;
        
        // If there are an vacation store => take data from it
        if(localVacations.length > 0){
            setVacations(localVacations);
            setPageCount(Math.ceil(localVacations.length/cardsPerPage));
        } else {
            dataService.getAllVacations()
            .then((v)=>{
                setVacations(v);
                setPageCount(Math.ceil(v.length/cardsPerPage));
            })
            .catch((error)=>{
                notifyService.error(error); 
                navigate("/greetings"); 
            });
        }
        
    },[]);

    // On filters change logic (must be in useEffect, since state change is async in React)
    useEffect(()=>{
        
        const currentVacations:VacationModel[] = vacationsStore.getState().vacations;
        const now = new Date();
        
        const filterPredicates = {
            isFollowing: (v: VacationModel) => v.isFollowing ===1,
            actualVacations: (v: VacationModel) => new Date(v.startDate) > now,
            startedVacations: (v: VacationModel) => (new Date(v.startDate) < now) && (new Date(v.endDate) > now),
        };
        
        const combinedFilter = (v:VacationModel) => {  
            return activeFilters.every((filter) => filterPredicates[filter as keyof typeof filterPredicates](v));
        };
        
        const filtered = currentVacations.filter(combinedFilter); 
        setVacations(filtered);
        setPageCount(Math.ceil(filtered.length/cardsPerPage));
        setCurrentPage(1);


    },[activeFilters]);

    // User check action will setActiveFilter state, and that will trigger useEffect that subscribed to activeFilters state (see above).
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); 
        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name));
        }
    }
        
    return (
        
 
    <div className="Home">
        
        <div className="filterMenu">
            <span style={{marginRight:"20px"}}>Filters:</span>
            <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(appConfig.filters.IS_FOLLOWING, (event.target as HTMLInputElement).checked)} label="Favorites" />
            <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(appConfig.filters.ACTUAL_VACATIONS, (event.target as HTMLInputElement).checked)} label="Actual" />
            <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(appConfig.filters.STARTED_VACATIONS, (event.target as HTMLInputElement).checked)} label="Started" />

        </div>
       
        <div className="cardsBox">
            <br />
            <h2>Available Vacations:</h2>
            <div >{calcPagination().map((v) => (<CardUI data={v} key={v.vacationId} />))}</div>

            {vacations.length > cardsPerPage&&<div className="paginationController">
                <Stack spacing={1}>
                    <Pagination count={pageCount} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange}/>
                </Stack>
            </div>}

        </div>

    </div>
    );
}

export default Home;
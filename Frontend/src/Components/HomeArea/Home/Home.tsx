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
    const [vacations, setVacations] = useState<VacationModel[]>([]); // Used to store vacations arr    
    const [activeFilters, setActiveFilters] = useState([]); // Used to store selected filter, onchange invokes filters useEffect 

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const cardsPerPage = 10;
    
    const calcPagination = (v: VacationModel[]) => {
        const endIndex = (currentPage * cardsPerPage);
        const startIndex = endIndex - cardsPerPage ; 
        return v.slice(startIndex, endIndex);
    };
        
    // On page start data fetch
    useEffect(()=>{
        
        // On load - take and render the vacations data from localStore/AJAX
        updateVacations();
        // On each store change, update and render data
        const unsubscribe = vacationsStore.subscribe(updateVacations);

        return ()=> unsubscribe();
        
    },[]);

    // Triggered on activeFilters state change
    useEffect(()=>{

        // Get full vacation arr from local store
        const allVacations:VacationModel[] = vacationsStore.getState().vacations;
        
        const now = new Date();
        
        // Filter func, includes filter options, returns booleans
        const filterPredicates = {
            isFollowing: (v: VacationModel) => v.isFollowing ===1,
            actualVacations: (v: VacationModel) => new Date(v.startDate) > now,
            startedVacations: (v: VacationModel) => (new Date(v.startDate) < now) && (new Date(v.endDate) > now),
        };
        
        // Pass v thru selected filters, and returns true if v passed the filterPredicate func
        const combinedFilter = (v:VacationModel) => {  
            return activeFilters.every((filter) => filterPredicates[filter as keyof typeof filterPredicates](v));
        };
        
        // Pass vacations to combinedFilter=>filterPredicates, and if gets true, adds this v to filtered arr.
        const filtered = allVacations.filter(combinedFilter);

        setVacations(calcPagination(filtered));
        setPageCount(Math.ceil(filtered.length/cardsPerPage));

    },[activeFilters]); 

    // Triggered on currentPage state change
    useEffect(()=>{
        
        const allVacations:VacationModel[] = vacationsStore.getState().vacations;

        setVacations(calcPagination(allVacations));

    },[currentPage]);

    // We run this init func onload and on vacations change 
    async function updateVacations(){
        
        let v = vacationsStore.getState().vacations;
        
        // Send ajax to server only if local store is empty
        if(v.length === 0 ){ 
            try{
                v = await dataService.getAllVacations(); 
            }catch(err: any){
                notifyService.error(err);
                navigate("/greetings"); // On error, send user back to start
            }
        }
        
        setPageCount(Math.ceil(v.length/cardsPerPage));
        setVacations(calcPagination(v));
        setCurrentPage(1);
    }

    // User check action will setActiveFilter state, and that will trigger useEffect that subscribed to activeFilters state (see above).
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); // Add new filter to active filters state (using spread operator)

        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name)); // Remove unselected filter from active filters state
        }
    }
        
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => { setCurrentPage(value); };

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
            <div >{vacations.map((v) => (<CardUI data={v} key={v.vacationId} />))}</div>

            {pageCount > 1 && <div className="paginationController">
                <Stack spacing={1}>
                    <Pagination count={pageCount} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange}/>
                </Stack>
            </div>}

        </div>

    </div>
    );
}

export default Home;
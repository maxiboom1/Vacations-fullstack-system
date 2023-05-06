import "./Home.css";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { vacationsStore } from "../../../Redux/VacationsState";
import appConfig from "../../../Utils/AppConfig";
import { Checkbox, FormControlLabel, Pagination, Stack } from "@mui/material";

function Home(): JSX.Element {
    
    const [cachedVacations, setCachedVacations] = useState<VacationModel[]>([]);
    const [allVacations, setAllVacations] = useState<VacationModel[]>([]);
    const [vacations, setVacations] = useState<VacationModel[]>([]); // Used to store vacations arr to print   
    const [activeFilters, setActiveFilters] = useState([]); // Used to store selected filter, onchange invokes filters useEffect 
    
    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const cardsPerPage = 5;
    const calcPagination = (v: VacationModel[]) => {
        const endIndex = (currentPage * cardsPerPage);
        const startIndex = endIndex - cardsPerPage ; 
        return v.slice(startIndex, endIndex);
    };
        
    // On page start data fetch
    useEffect(()=>{ 
        console.log("useEffect: start")         
        const data = vacationsStore.getState().vacations;
        fetchData(data);

        const unsubscribe = vacationsStore.subscribe(()=>{
            console.log('subscribe');
            const newVacations = vacationsStore.getState().vacations;           
            if(newVacations.length != allVacations.length ){ fetchData(newVacations);}
        });
        
        return () => unsubscribe();

    },[]);

    async function fetchData(v:VacationModel[]){
        
        console.log('fetch');
                
        if(v.length === 0){
            await dataService.getAllVacations().then((data)=>{v = [...data]}).catch((err)=>{notifyService.error(err);})
        }
        
        setVacations([...calcPagination(v)]);
        setPageCount(Math.ceil(v.length/cardsPerPage));
        setCachedVacations([...v]);
        setAllVacations([...v]);        
    }

    // Triggered on activeFilters state change
    useEffect(()=>{
        console.log("useEffect: filter")         
        const data:VacationModel[] = vacationsStore.getState().vacations;
        if(activeFilters.length > 0){
            // Get full vacation arr from local store 
            
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
            const filtered = data.filter(combinedFilter);
            
            setCachedVacations([...filtered]); console.log('filter setCachedVacations');
            setVacations([...calcPagination(filtered)]);
            setPageCount(Math.ceil(filtered.length/cardsPerPage));
            setCurrentPage(1);
        } else {
            setCachedVacations([...data]); console.log('filter bypass setCachedVacations');
            setVacations([...calcPagination(data)]);
            setPageCount(Math.ceil(data.length/cardsPerPage));
            setCurrentPage(1);
        }

    },[activeFilters]); 

    // Triggered on currentPage state change
    useEffect(()=>{
        
        console.log("useEffect: pagination",cachedVacations);        
        setVacations([...calcPagination(cachedVacations)]);

    },[currentPage, cachedVacations]);

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
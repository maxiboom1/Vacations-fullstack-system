import "./Home.css";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import CardUI from "../CardUI/CardUI";
import { vacationsStore } from "../../../Redux/VacationsState";
import { Checkbox, FormControlLabel, Pagination, Stack } from "@mui/material";
import NoItemsFound from "../NoItemsFound/NoItemsFound";
import { authStore } from "../../../Redux/AuthState";
import { useNavigate } from "react-router-dom";

// Instead pass raw values from filter checkboxes, we use enum to avoid bugs/improve security 
enum filters {
    IS_FOLLOWING = 'isFollowing',
    ACTUAL_VACATIONS = 'actualVacations',
    STARTED_VACATIONS = 'startedVacations',
    }

function Home(): JSX.Element {
    
    const user = authStore.getState().user;
    const navigate = useNavigate();
    
    const [vacations, setVacations] = useState<VacationModel[]>([]); 
    const [activeFilters, setActiveFilters] = useState([]); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const cardsPerPage = 10;
    const calcPagination = () => {
        const endIndex = (currentPage * cardsPerPage);
        const startIndex = endIndex - cardsPerPage ; 
        return vacations.slice(startIndex, endIndex);
    };
    
    // Onload, runs once
    useEffect(()=>{ 
        
        if(!user){ 
            navigate("/greetings"); 
            notifyService.error('You are not logged in');
            return;
        }
        // Get data and render
        let allVacations = vacationsStore.getState().vacations;
        
        if(!allVacations){
            dataService.getAllVacations()
            .then((data)=>{allVacations = [...data];})
            .catch((err: any)=>{notifyService.error(err);});
        }
        
        setPageCount(Math.ceil(allVacations.length/cardsPerPage)); 
        setVacations(allVacations);
        
        dataService.getAllVacations()
            .then((data)=>{
                setPageCount(Math.ceil(data.length/cardsPerPage)); 
                setVacations(data);
            })
            .catch((err: any)=>{
                notifyService.error(err);
            })
        
        // Subscribe to vacations store to set updates 
        const unsubscribe = vacationsStore.subscribe(()=>{
            
            const action = vacationsStore.getState().lastAction;

            if(action === "DeleteVacation"){
                const data = vacationsStore.getState().vacations;   
                setVacations([...data]);
            }
        return ()=> unsubscribe(); 
        });

        // Kill subscribe on page destroy
        return () => unsubscribe();

    },[]);

    // Listens for changes on activeFilter
    useEffect(()=>{
        
        // Not efficient (but straightforward), since we run thru all array each filter select, 
        // even if we have filtered part of it => should optimize it but it not so simple, we have 3 steps here.
        // So, basically we can use current vacations only on steps-in, but on steps-out we need all data.
        const data:VacationModel[] = vacationsStore.getState().vacations;  
        const now = new Date();
        
        // Filter object with functions, returns booleans
        const filterPredicates = {
            isFollowing: (v: VacationModel) => v.isFollowing ===1,
            actualVacations: (v: VacationModel) => new Date(v.startDate) > now,
            startedVacations: (v: VacationModel) => (new Date(v.startDate) < now) && (new Date(v.endDate) > now),
        };
        
        // Pass v thru selected filters, and returns true if v passed the filterPredicate obj of functions
        const selectedFilter = (v:VacationModel) => {  
            return activeFilters.every((filter) => filterPredicates[filter as keyof typeof filterPredicates](v));
        };
        
        // Filter vacations
        const filtered = data.filter(selectedFilter);
        
        setVacations(filtered);
        setPageCount(Math.ceil(filtered.length/cardsPerPage));
        setCurrentPage(1);    
    
    },[activeFilters]);

    // Change on activeFilter will trigger useEffect with activeFilter dependency and run filter logic
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); // Add new filter to active filters state (using spread operator)

        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name)); // Remove unselected filter from active filters state
        }
    }
     
    // Pages navigation handler
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => { setCurrentPage(value); };

    return (
        
        <div className="Home">
            
            {/* Filter bar */}
            
            <div className="filterMenu">
                <span style={{marginRight:"20px"}}>Filters:</span>
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(filters.IS_FOLLOWING, (event.target as HTMLInputElement).checked)} label="Favorites" />
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(filters.ACTUAL_VACATIONS, (event.target as HTMLInputElement).checked)} label="Actual" />
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(filters.STARTED_VACATIONS, (event.target as HTMLInputElement).checked)} label="Started" />
            </div>
        
            <div className="cardsBox">

                {/* Data area */}

                <br />
                {vacations.length>0 && <h2>Vacations:</h2>}
                <div>{calcPagination().map((v) => (<CardUI data={v} key={v.vacationId} />))}</div>
                
                {/* The 2-nd condition makes sure that it will be visible only when redux not empty (so i won't see this on page load) */}
                {vacations.length === 0 && vacationsStore.getState().vacations.length > 0 && < NoItemsFound />}
                
                {/* Pagination bar */}
                
                {pageCount > 1 && 
                    <div className="paginationController">
                        <Stack spacing={1}>
                            <Pagination count={pageCount} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange}/>
                        </Stack>
                    </div>
                }

            </div>

        </div>
    );
}

export default Home;


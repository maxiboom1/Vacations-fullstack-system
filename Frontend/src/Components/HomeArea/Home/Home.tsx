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
import Filters from "../../../Models/FiltersModel";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import CsvGenerator from "../../../Services/CsvService";

function Home(): JSX.Element {
    
    const user = authStore.getState().user;
    
    const navigate = useNavigate();
    
    const [vacations, setVacations] = useState<VacationModel[]>([]); 
    
    const [activeFilters, setActiveFilters] = useState([]); 
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const [pageCount, setPageCount] = useState<number>(1);
    
    const cardsPerPage = 6;
    
    const calcPagination = () => {
        const endIndex = (currentPage * cardsPerPage);
        const startIndex = endIndex - cardsPerPage ; 
        return vacations.slice(startIndex, endIndex);
    };
    
    // Onload, runs once
    useEffect(()=>{ 
        
        // Restrict access to unauthorized users
        if(!user){ 
            navigate("/greetings"); 
            notifyService.error('You are not logged in');
            return;
        }
        
        // Get data from local store
        let allVacations = vacationsStore.getState().vacations;
        
        // If no data in local store, get data from server, store state and calc pageCount 
        if(allVacations.length === 0){
            dataService.getAllVacations()
            .then((data)=>{
                allVacations = [...data];
                setPageCount(Math.ceil(allVacations.length/cardsPerPage)); 
                setVacations(allVacations);
            })
            .catch((err: any)=>{notifyService.error(err);});
        
        // If there is data in local store, store state and calc pageCount     
        } else {
            setPageCount(Math.ceil(allVacations.length/cardsPerPage)); 
            setVacations(allVacations); 
        }

        
        // Subscribe to vacations store to set updates 
        const unsubscribe = vacationsStore.subscribe(()=>{
            
            // Get last redux action
            const action = vacationsStore.getState().lastAction;
            
            // If it was delete, render component (likes/followers actions handled from card redux listener)
            if(action === "DeleteVacation"){
                const data = vacationsStore.getState().vacations;   
                setVacations([...data]);
                setPageCount(Math.ceil(data.length/cardsPerPage)); 
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

    function downloadCsv() {
        // Create csv link
        const csvLink = CsvGenerator(vacations);
      
        // Add HTML link to DOM
        document.body.appendChild(csvLink);
      
        // Trigger click
        csvLink.click();
      
        // Remove link from DOM
        document.body.removeChild(csvLink);
      }
      

    return (
        
        <div className="Home">
            
            {/* Filter bar */}
            
            <div className="filterMenu">
                <span style={{marginRight:"20px"}}>Filters:</span>
                {user.roleId === 2 &&<FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.IS_FOLLOWING, (event.target as HTMLInputElement).checked)} label="Favorites" />}
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.ACTUAL_VACATIONS, (event.target as HTMLInputElement).checked)} label="Actual" />
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.STARTED_VACATIONS, (event.target as HTMLInputElement).checked)} label="Started" />
            </div>
            
            {user.roleId === 1 && <div className="adminTools">
                <div><DownloadForOfflineOutlinedIcon className="adminIcons" onClick={downloadCsv} /></div>
                <div><LibraryAddOutlinedIcon className="adminIcons" onClick={()=> navigate("/new")}/></div>
                <div><SignalCellularAltOutlinedIcon className="adminIcons" onClick={()=> navigate("/statistics")} /></div>
            </div>}
            
            <div className="cardsBox">

                {/* Data area */}

                <br />
                {vacations.length>0 && <h2>Vacations:</h2>}
                <div>{calcPagination().map((v) => (<CardUI data={v} key={v.vacationId} />))}</div>
                
                {/* No Items Found => The 2-nd condition makes sure i won't see this on page load */}
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
import VacationModel from "../Models/VacationsModel";

function CsvGenerator(vacations: VacationModel[]) {
    
    // Create csv from given vacations array
    const csv = "Destination,Followers Count\n" + vacations.map(vacation => `${vacation.destination},${vacation.followersCount}`).join("\n");
  
    // Encode the CSV content URI to avoid special characters causing issues with the CSV file's structure
    const encodedUri = encodeURI(csv);
  
    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vacations.csv");
  
    // Return the link element
    return link;
  }

export default CsvGenerator;
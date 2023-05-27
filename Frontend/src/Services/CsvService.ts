import VacationModel from "../Models/VacationsModel";

function CsvGenerator(vacations: VacationModel[]) {
  
  // Create csv from given vacations array      
  let csvContent = "vacation.destination,vacation.followersCount\n"; // CSV content
  
  // Add vacations to csv
  vacations.forEach((vacation) => {
    const row = `${vacation.destination},${vacation.followersCount}\n`; // CSV row
    csvContent += row;
  });
  
  // Create Blob (Binary Large Object) object:  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create link:
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "vacations.csv"); // Set the filename for the downloaded file

  return link;
  }

export default CsvGenerator;
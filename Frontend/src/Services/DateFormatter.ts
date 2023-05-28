// Utility service that converts date strings, handle 2 cases: "2023-04-17T21:00:00.000Z" OR "2023-03-31"
function formatDate(timeString: string): string {
  
  const date = new Date(timeString);

  if ( isNaN(date.getTime()) ) { return 'Invalid Date'; }

  // expected input: "2023-04-17T21:00:00.000Z" OR "2023-03-31"
  if (timeString.length === 24 || timeString.length === 10) {

    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

  }

  return 'Invalid Time Format';
}

export default formatDate;
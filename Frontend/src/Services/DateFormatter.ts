

// TO DO: siplify this
function formatDate(timeString: string): string {
    
    const date = new Date(timeString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    if (timeString.length === 10) {
      return date.toLocaleDateString('en-US');
    } else if (timeString.length === 24) {
      if (timeString[timeString.length - 1] === 'Z') {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    } else if (timeString.length === 19) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else if (timeString.length === 8) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  
    return 'Invalid Time Format';
  }

  export default formatDate;
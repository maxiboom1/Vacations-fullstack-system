function formatDate(timeString: string): string {
  console.log(timeString);
  const date = new Date(timeString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
    }

  if (timeString.length === 24) {

    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  }

  return 'Invalid Time Format';
}

export default formatDate;
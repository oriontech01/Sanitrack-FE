function formatDate(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);
  
    // Get the day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero, months are 0-indexed
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of year
  
    // Format the date as DD/MM/YY
    return `${day}/${month}/${year}`;
  }

export default formatDate
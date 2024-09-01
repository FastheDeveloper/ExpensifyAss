const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Morning';
  } else if (currentHour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return '1 day ago';
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (days < 30) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days < 180) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days < 365) {
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
  } else {
    return '1 year ago';
  }
};

function sortTransactionsByInsertedDate(transactions) {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.inserted);
    const dateB = new Date(b.inserted);
    return dateB - dateA; // Sort in descending order (most recent first)
  });
}

const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function formatDateDisplay(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Define arrays for month names and suffixes
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const suffixes = ['st', 'nd', 'rd', 'th'];

  // Get the day and determine the correct suffix
  const day = date.getDate();
  let suffix;
  if (day >= 11 && day <= 13) {
    suffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }

  // Format the date components
  const formattedDay = `${day}${suffix}`;
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12 for midnight

  // Construct the final formatted string
  return `${formattedDay} ${month} ,${year} at ${hours}:${minutes} ${ampm}`;
}
export {
  getRelativeTime,
  sortTransactionsByInsertedDate,
  formatDateTime,
  getGreeting,
  formatDateDisplay,
};

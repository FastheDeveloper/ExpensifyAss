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

export { getRelativeTime, sortTransactionsByInsertedDate, formatDateTime, getGreeting };

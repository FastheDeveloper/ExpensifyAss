// Validate email address format using a regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate if the amount is a number
export const validateAmount = (amount) => {
  return !isNaN(Number(amount)) && typeof amount === 'number';
};

// Check if all required fields are filled
export const allFieldsFilled = (details) => {
  // Ensure the email is valid and the password field is not empty
  return validateEmail(details.email) && details.password.trim() !== '';
};

// Handle blur event for email input field
export const handleEmailBlur = (email, setErrorMessage) => {
  if (!validateEmail(email) && email.trim() !== '') {
    setErrorMessage('Invalid email address');
  } else {
    setErrorMessage('');
  }
};

// Handle blur event for amount input field
export const handleAmountBlur = (amount, setErrorMessage) => {
  if (!validateAmount(amount)) {
    setErrorMessage('Invalid amount entered. Must be a number');
  } else {
    setErrorMessage('');
  }
};

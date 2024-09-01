export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAmount = (amount) => {
  return !isNaN(Number(amount)) && typeof amount === 'number';
};

// Function to check if all fields are filled
export const allFieldsFilled = (details) => {
  // Check if email is valid and other fields are non-empty
  return validateEmail(details.email) && details.password.trim() !== '';
};

// Function to handle email blur
export const handleEmailBlur = (email, setErrorMessage) => {
  if (!validateEmail(email) && email.trim() !== '') {
    setErrorMessage('Invalid email address');
  } else {
    setErrorMessage('');
  }
};

export const handleAmountBlur = (amount, setErrorMessage) => {
  if (!validateAmount(amount)) {
    setErrorMessage('Invalid amount entered. Must be a number');
  } else {
    setErrorMessage('');
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

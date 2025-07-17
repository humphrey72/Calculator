// Get elements
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const emailFeedback = document.getElementById('emailFeedback');
const passwordFeedback = document.getElementById('passwordFeedback');
const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
const submitButton = document.getElementById('submitButton');
const registrationForm = document.getElementById('registrationForm');

// Validation states
let isEmailValid = false;
let isPasswordValid = false;
let arePasswordsMatching = false;

// Function to update input and feedback styles
function updateValidationState(inputElement, feedbackElement, isValid, message) {
    feedbackElement.textContent = message;
    if (isValid) {
        feedbackElement.className = 'feedback-message valid';
        inputElement.className = 'valid-input';
    } else {
        feedbackElement.className = 'feedback-message invalid';
        inputElement.className = 'invalid-input';
    }
    // If input is empty, clear feedback and reset styles
    if (inputElement.value.trim() === '') {
        feedbackElement.textContent = '';
        inputElement.className = '';
    }
    checkFormValidity();
}

// Email Validation
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

    if (email === '') {
        isEmailValid = false;
        updateValidationState(emailInput, emailFeedback, false, ''); // Clear feedback
    } else if (emailRegex.test(email)) {
        isEmailValid = true;
        updateValidationState(emailInput, emailFeedback, true, 'Email looks good!');
    } else {
        isEmailValid = false;
        updateValidationState(emailInput, emailFeedback, false, 'Please enter a valid email address.');
    }
}

// Password Validation
function validatePassword() {
    const password = passwordInput.value;

    if (password === '') {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, ''); // Clear feedback
    } else if (password.length < 8) {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, 'Password must be at least 8 characters long.');
    } else if (!/[A-Z]/.test(password)) {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, 'Password needs an uppercase letter.');
    } else if (!/[a-z]/.test(password)) {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, 'Password needs a lowercase letter.');
    } else if (!/[0-9]/.test(password)) {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, 'Password needs a number.');
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        isPasswordValid = false;
        updateValidationState(passwordInput, passwordFeedback, false, 'Password needs a special character.');
    }
    else {
        isPasswordValid = true;
        updateValidationState(passwordInput, passwordFeedback, true, 'Strong password!');
    }
    confirmPasswords(); // Re-check confirm password whenever main password changes
}

// Confirm Password Validation
function confirmPasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === '') {
        arePasswordsMatching = false;
        updateValidationState(confirmPasswordInput, confirmPasswordFeedback, false, ''); // Clear feedback
    } else if (password === confirmPassword) {
        arePasswordsMatching = true;
        updateValidationState(confirmPasswordInput, confirmPasswordFeedback, true, 'Passwords match!');
    } else {
        arePasswordsMatching = false;
        updateValidationState(confirmPasswordInput, confirmPasswordFeedback, false, 'Passwords do not match.');
    }
}

// Check overall form validity to enable/disable submit button
function checkFormValidity() {
    if (isEmailValid && isPasswordValid && arePasswordsMatching) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Optional: Handle form submission (prevents default and shows success)
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    if (isEmailValid && isPasswordValid && arePasswordsMatching) {
        alert('Form submitted successfully! (This is a demo, no actual data sent)');
        // In a real application, you would send data to a server here.
        registrationForm.reset(); // Clear the form
        // Reset validation states and feedback messages
        isEmailValid = false;
        isPasswordValid = false;
        arePasswordsMatching = false;
        emailFeedback.textContent = '';
        passwordFeedback.textContent = '';
        confirmPasswordFeedback.textContent = '';
        emailInput.className = '';
        passwordInput.className = '';
        confirmPasswordInput.className = '';
        submitButton.disabled = true;
    } else {
        alert('Please fix the errors before submitting.');
    }
});

// Initial validation check on load (though inputs are empty initially)
// This ensures button is disabled if fields are left empty
validateEmail();
validatePassword();
confirmPasswords();
// ... (inside the form submission event listener) ...

try {
    const response = await fetch('http://localhost:8000/register.php', { // <-- UPDATE THIS URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    // ... (rest of your fetch logic remains the same) ...
} catch (error) {
    // ...
} finally {
    // ...
}
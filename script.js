let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let eAddress = document.getElementById("email");
let passWord = document.getElementById("password");
let btn = document.getElementById("btn");

const inputs = [firstName, lastName, eAddress, passWord];

// Add event listeners to clear validation on focus and validate on blur
inputs.forEach((input) => {
  input.addEventListener("focus", clearValidation);
  input.addEventListener("blur", validateInput);
});

btn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  // Clear previous validation messages
  clearValidationMessages();

  let allValid = true;

  // Validate First Name
  if (firstName.value.trim() === "") {
    displayValidationMessage(firstName, "First Name cannot be empty");
    allValid = false;
  }

  // Validate Last Name
  if (lastName.value.trim() === "") {
    displayValidationMessage(lastName, "Last Name cannot be empty");
    allValid = false;
  }

  // Validate Email Address
  if (eAddress.value.trim() === "") {
    displayValidationMessage(eAddress, "Email Address cannot be empty");
    allValid = false;
  } else if (!isValidEmail(eAddress.value.trim())) {
    displayValidationMessage(eAddress, "Looks like this is not an email");
    allValid = false;
  }

  // Validate Password
  if (passWord.value.trim() === "") {
    displayValidationMessage(passWord, "Password cannot be empty");
    allValid = false;
  } else if (passWord.value.trim().length < 8) {
    displayValidationMessage(passWord, "Password must be at least 8 characters long.");
    allValid = false;
  }

  // If all validations pass, navigate to a different page
  if (allValid) {
    console.log("Form submitted successfully!");
    window.location.href = "registration.html"; // Replace with your desired URL
  }
});

// Function to validate email address using a simple regex pattern
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function to display validation message next to input field
function displayValidationMessage(inputElement, message) {
  const validationMessage = document.createElement("div");
  validationMessage.className = "validation-message";
  validationMessage.textContent = message;

  inputElement.style.borderColor = "red";
  inputElement.style.backgroundImage = "url('static/images/icon-error.svg')"; // Replace 'path/to/your/icon.png' with the actual path to your icon
  inputElement.style.backgroundSize = "5%";
  inputElement.style.backgroundRepeat = "no-repeat";
  inputElement.style.backgroundPosition = "right center";
  inputElement.style.paddingRight = "3%";
  inputElement.style.backgroundOrigin = "content-box";
  inputElement.parentElement.appendChild(validationMessage);
}

// Function to clear validation on focus
function clearValidation(event) {
  const inputElement = event.target;
  inputElement.style.borderColor = "";
  inputElement.style.backgroundImage = "";
  const validationMessage = inputElement.parentElement.querySelector(".validation-message");
  if (validationMessage) {
    inputElement.parentElement.removeChild(validationMessage);
  }
}

// Function to validate input on blur
function validateInput(event) {
  const inputElement = event.target;
  if (inputElement === firstName) {
    if (firstName.value.trim() === "") {
      displayValidationMessage(firstName, "First Name cannot be empty");
    }
  } else if (inputElement === lastName) {
    if (lastName.value.trim() === "") {
      displayValidationMessage(lastName, "Last Name cannot be empty");
    }
  } else if (inputElement === eAddress) {
    if (eAddress.value.trim() === "") {
      displayValidationMessage(eAddress, "Email Address cannot be empty");
    } else if (!isValidEmail(eAddress.value.trim())) {
      displayValidationMessage(eAddress, "Looks like this is not an email");
    }
  } else if (inputElement === passWord) {
    if (passWord.value.trim() === "") {
      displayValidationMessage(passWord, "Password cannot be empty");
    } else if (passWord.value.trim().length < 8) {
      displayValidationMessage(passWord, "Password must be at least 8 characters long.");
    }
  }
}

// Function to clear all validation messages
function clearValidationMessages() {
  const validationMessages = document.querySelectorAll(".validation-message");
  validationMessages.forEach((message) => message.remove());
}

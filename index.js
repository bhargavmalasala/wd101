// Get form, table body, DOB input, error message, and submit button elements
const userForm = document.getElementById("user-form");
const entriesTableBody = document.getElementById("entries-table-body");
const dobInput = document.getElementById("dob");
const dobError = document.getElementById("dob-error");
const submitBtn = document.getElementById("submit-btn");

// Initialize userEntries from localStorage or as an empty array
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];


// Function to calculate age from date of birth
const calculateAge = (dob) => {
  if (!dob) {
    return null; // Return null if dob is empty or invalid
  }

  const birthDate = new Date(dob);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return null; // Return null if the date is invalid
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

// Function to validate age and update UI
const validateAge = () => {
  const dob = dobInput.value;
  const age = calculateAge(dob);

  if (age === null || age < 18 || age > 55) {
    if (age !== null) {
      dobError.textContent = `Age must be between 18 and 55 years. Current age: ${age}`;
    } else {
      dobError.textContent = "Please enter a valid date of birth.";
    }
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    dobError.textContent = "";
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
};

// Function to display entries in the table
const displayEntries = () => {
  entriesTableBody.innerHTML = ""; // Clear the table body
  userEntries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.password}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.dob}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entry.acceptedTermsAndConditions}</td>
    `;
    entriesTableBody.appendChild(row);
  });
};

// Function to handle form submission
const saveUserForm = (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  

  // Validate age (redundant due to real-time validation, but kept as a fallback)
  const age = calculateAge(dob);
  if (age === null || age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  // Create entry object
  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions
  };

  // Add entry to userEntries array
  userEntries.push(entry);

  // Save to localStorage
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  // Display updated entries
  displayEntries();

  // Reset the form
  userForm.reset();
  // Reset the submit button state after form reset
  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-50", "cursor-not-allowed");
  dobError.textContent = "";
};

// Add event listener for DOB input to validate age in real-time
dobInput.addEventListener("input", validateAge);

// Display existing entries on page load
displayEntries();

// Add event listener for form submission
userForm.addEventListener("submit", saveUserForm);

// Get form and table body elements
const userForm = document.getElementById("user-form");
const entriesTableBody = document.getElementById("entries-table-body");

// Initialize userEntries from localStorage or as an empty array
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to calculate age from date of birth
const calculateAge = (dob) => {
  // Ensure dob is a valid date string
  if (!dob) {
    return null; // Return null if dob is empty or invalid
  }

  const birthDate = new Date(dob);
  const today = new Date();

  // Check if birthDate is a valid date
  if (isNaN(birthDate.getTime())) {
    return null; // Return null if the date is invalid
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if the birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
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

  // Validate email
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate age (18 to 55 years)
  const age = calculateAge(dob);
  if (age === null) {
    alert("Please enter a valid date of birth.");
    return;
  }
  if (age < 18 || age > 55) {
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
};

// Display existing entries on page load
displayEntries();

// Add event listener for form submission
userForm.addEventListener("submit", saveUserForm);

document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById("email");
    const dob = document.getElementById("dob");
    const userForm = document.getElementById("user-form");
    
    // Set max date (18 years ago)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    
    // Set min date (55 years ago)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 55);
    
    // Format dates to YYYY-MM-DD for input[type=date]
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    dob.max = formatDate(maxDate);
    dob.min = formatDate(minDate);

    email.addEventListener("input", () => validate(email));
    dob.addEventListener("change", () => validateAge(dob));

    const submit = document.getElementById("submit");
    submit.addEventListener("click", (e) => {
      validate(email);
      validateAge(dob);
    });

    function validate(element) {
      if (element.validity.typeMismatch) {
        element.setCustomValidity("The Email is not in the right format!!!");
        element.reportValidity();
      } else {
        element.setCustomValidity("");
      }
    }
    
    function validateAge(element) {
      const selectedDate = new Date(element.value);
      if (selectedDate > maxDate) {
        element.setCustomValidity("You must be at least 18 years old");
        element.reportValidity();
      } else if (selectedDate < minDate) {
        element.setCustomValidity("You must be younger than 55 years old");
        element.reportValidity();
      } else {
        element.setCustomValidity("");
      }
    }

    const retrieveEntries = () => {
      let entries = localStorage.getItem("user-entries");
      if (entries) {
          entries = JSON.parse(entries);
      } else {
          entries = [];
      }
      return entries;
    }

    let userEntries = retrieveEntries();

    const displayEntries = () => {
      const entries = retrieveEntries();
      const entriesBody = document.getElementById("entries-body");
      entriesBody.innerHTML = '';
      
      entries.forEach((entry) => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        nameCell.className = "border px-4 py-2";
        
        const emailCell = document.createElement('td');
        emailCell.textContent = entry.email;
        emailCell.className = "border px-4 py-2";
        
        const passwordCell = document.createElement('td');
        passwordCell.textContent = entry.password;
        passwordCell.className = "border px-4 py-2";
        
        const dobCell = document.createElement('td');
        dobCell.textContent = entry.dob;
        dobCell.className = "border px-4 py-2";
        
        const acceptTermsCell = document.createElement('td');
        acceptTermsCell.textContent = entry.acceptedTermsAndconditions ? 'Yes' : 'No';
        acceptTermsCell.className = "border px-4 py-2";
        
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(passwordCell);
        row.appendChild(dobCell);
        row.appendChild(acceptTermsCell);
        
        entriesBody.appendChild(row);
      });
    }

    const saveUserForm = (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const acceptedTermsAndconditions = document.getElementById("terms").checked;

      const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions,
      };

      userEntries.push(entry);
      localStorage.setItem("user-entries", JSON.stringify(userEntries));
      
      // Reset form
      event.target.reset();
      
      // Display new entries
      displayEntries();
    };

    userForm.addEventListener("submit", saveUserForm);
    displayEntries();
  });

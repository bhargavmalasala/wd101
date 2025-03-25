document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const entriesTable = document.getElementById("entries");

  // Set valid age range for DOB
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 58); // 2025 - 58 = 1967
  
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 21); // 2025 - 21 = 2004
  
  const dobInput = document.getElementById("dob");
  dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
  dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);

  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entriesTable.innerHTML = entries
      .map(
        (entry) => `<tr>
            <td class="border-2 text-center py-1 px-5">${entry.name}</td>
            <td class="border-2 text-center py-1 px-5">${entry.email}</td>
            <td class="border-2 text-center py-1 px-5">${entry.password}</td>
            <td class="border-2 text-center py-1 px-5">${entry.dob}</td>
            <td class="border-2 text-center py-1 px-5">${entry.accepted}</td>
        </tr>`
      )
      .join("");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accepted = document.getElementById("accepted").checked; // true/false

    // Store data
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push({ name, email, password, dob, accepted });
    localStorage.setItem("entries", JSON.stringify(entries));

    loadEntries();
    form.reset(); // Clear form after submission
  });

  loadEntries();
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

const submit = document.getElementById("submit");
submit.addEventListener("click", () => validate(email));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The Email is not in the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

let userForms = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
      const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
      const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
      const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
      const acceptTermsCell = `<td class="border px-4 py-2">${
        entry.acceptedTermsAndconditions ? "Yes" : "No"
      }</td>`;

      const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Password</th>
            <th class="border px-4 py-2">DOB</th>
            <th class="border px-4 py-2">Accepted terms</th>
          </tr>
        </thead>
        <tbody>
          ${tableEntries}
        </tbody>
      </table>
    `;

  document.getElementById("entries").innerHTML = table;
};

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
  displayEntries();
};

userForms.addEventListener("submit", saveUserForm);
displayEntries();

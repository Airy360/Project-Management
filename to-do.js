window.addEventListener('load', () => {
    document.querySelector('.header-content').classList.add('visible');
});

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0Hkr_PZasNsGk0jfN3R38zaMk0GABR_w",
  authDomain: "project-management-experiment.firebaseapp.com",
  databaseURL: "https://project-management-experiment-default-rtdb.firebaseio.com/",
  projectId: "project-management-experiment",
  storageBucket: "project-management-experiment.appspot.com",
  messagingSenderId: "690954970080",
  appId: "1:690954970080:web:6f427e8bf0e0742fee4185",
  measurementId: "G-V1LC8DRZ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to fetch data and populate the table
function fetchAndDisplayProjects() {
  const tableBody = document.querySelector("#project-table tbody");
  const dbRef = ref(db, "user/");

  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const projects = snapshot.val();
      tableBody.innerHTML = ""; // Clear the table before adding rows

      // Populate rows dynamically
      Object.keys(projects).forEach((projectName) => {
        const project = projects[projectName];

        // Create a row
        const row = document.createElement("tr");

        // Columns: Project Name, Due Date, Assigned Writer, Status
        row.innerHTML = `
          <td>${project.project}</td>
          <td><input type="date" value="${project.duedate || ""}" class="due-date" data-project="${projectName}"></td>
          <td><input type="text" value="${project.writername || ""}" class="writer-name" data-project="${projectName}"></td>
          <td>
            <select class="status" data-project="${projectName}">
              <option value="Not Started" ${project.status === "Not Started" ? "selected" : ""}>Not Started</option>
              <option value="In Progress" ${project.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Completed" ${project.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
          </td>
        `;

        tableBody.appendChild(row);
      });

      // Add event listeners for auto-save
      document.querySelectorAll(".due-date").forEach((input) => {
        input.addEventListener("change", handleUpdate);
      });
      document.querySelectorAll(".writer-name").forEach((input) => {
        input.addEventListener("blur", handleUpdate);
      });
      document.querySelectorAll(".status").forEach((select) => {
        select.addEventListener("change", handleUpdate);
      });
    } else {
      tableBody.innerHTML = "<tr><td colspan='4'>No projects found.</td></tr>";
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}

// Function to handle automatic updates
function handleUpdate(event) {
  const element = event.target;
  const projectName = element.dataset.project;

  // Determine what field is being updated
  const field = element.classList.contains("due-date")
    ? "duedate"
    : element.classList.contains("writer-name")
    ? "writername"
    : "status";

  const value = element.value;

  // Update the database
  const projectRef = ref(db, `user/${projectName}`);
  update(projectRef, { [field]: value })
    .then(() => {
      console.log(`Project "${projectName}" updated: ${field} = ${value}`);
    })
    .catch((error) => {
      console.error("Error updating project:", error);
    });
}

// Call the function to populate the table on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayProjects);

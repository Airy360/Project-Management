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

        // Columns: Project Name, Due Date, Assigned Writer, Status, Submission, Actions
        row.innerHTML = `
          <td>${project.project}</td>
          <td><input type="date" value="${project.duedate || ""}" class="due-date"></td>
          <td>${project.writername}</td>
          <td>
            <select class="status">
              <option value="Not Started" ${project.status === "Not Started" ? "selected" : ""}>Not Started</option>
              <option value="In Progress" ${project.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Completed" ${project.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
          </td>
          <td>
            <input type="text" value="${project.submission || ""}" class="submission">
          </td>
          <td>
            <button class="save-button" data-project="${projectName}">Save</button>
          </td>
        `;

        tableBody.appendChild(row);
      });

      // Add event listeners to Save buttons
      document.querySelectorAll(".save-button").forEach((button) => {
        button.addEventListener("click", handleSave);
      });
    } else {
      tableBody.innerHTML = "<tr><td colspan='6'>No projects found.</td></tr>";
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}

// Function to handle save updates
function handleSave(event) {
  const button = event.target;
  const projectName = button.dataset.project;

  // Get the row data
  const row = button.closest("tr");
  const dueDate = row.querySelector(".due-date").value;
  const status = row.querySelector(".status").value;
  const submission = row.querySelector(".submission").value;

  // Update the database
  const projectRef = ref(db, `user/${projectName}`);
  update(projectRef, {
    duedate: dueDate,
    status: status,
    submission: submission
  }).then(() => {
    alert(`Project "${projectName}" updated successfully!`);
  }).catch((error) => {
    console.error("Error updating project:", error);
  });
}

// Call the function to populate the table on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayProjects);
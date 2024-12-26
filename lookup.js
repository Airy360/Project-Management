// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0Hkr_PZasNsGk0jfN3R38zaMk0GABR_w",
  authDomain: "project-management-experiment.firebaseapp.com",
  databaseURL: "https://project-management-experiment-default-rtdb.firebaseio.com",
  projectId: "project-management-experiment",
  storageBucket: "project-management-experiment.appspot.com",
  messagingSenderId: "690954970080",
  appId: "1:690954970080:web:6f427e8bf0e0742fee4185",
  measurementId: "G-V1LC8DRZ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lookup functionality
document.getElementById("lookup-button").addEventListener("click", () => {
  const projectName = document.getElementById("project-name").value.trim();

  if (!projectName) {
    alert("Please enter a project name!");
    return;
  }

  const projectRef = ref(db, 'projects/' + projectName);

  get(projectRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const projectData = snapshot.val();

        document.getElementById("project-details").innerHTML = `
          <div class="project-details">
            <h2>Project Details</h2>
            <p><strong>Project Name:</strong> <span class="highlight">${projectData.project}</span></p>
            <p><strong>Project Scope:</strong> <span class="highlight">${projectData.projectscope}</span></p>
            <p><strong>Assigned Writer:</strong> <span class="highlight">${projectData.writername}</span></p>
            <p><strong>Due Date:</strong> <span class="highlight">${projectData.duedate}</span></p>
          </div>
        `;
      } else {
        document.getElementById("project-details").innerHTML = `
          <p>No project found with the name "${projectName}".</p>
        `;
      }
    })
    .catch((error) => {
      console.error("Error retrieving project data:", error);
      alert("An error occurred while fetching project details.");
    });
});

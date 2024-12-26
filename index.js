window.addEventListener('load', () => {
    document.querySelector('.header-content').classList.add('visible');
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Hkr_PZasNsGk0jfN3R38zaMk0GABR_w",
  authDomain: "project-management-experiment.firebaseapp.com",
  projectId: "project-management-experiment",
  storageBucket: "project-management-experiment.firebasestorage.app",
  messagingSenderId: "690954970080",
  appId: "1:690954970080:web:6f427e8bf0e0742fee4185",
  measurementId: "G-V1LC8DRZ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get ref to database services
const db = getDatabase(app);

document.getElementById("submit").addEventListener("click", function(e) {
  e.preventDefault(); // Prevent form submission
  const projectName = document.getElementById("project-name").value;
  const projectScope = document.getElementById("project-scope").value;
  const writerName = document.getElementById("writer-name").value;

  set(ref(db, 'user/' + projectName), {
      project: projectName,
      projectscope: projectScope,
      writername: writerName,
  })
  .then(() => {
      alert("Project Has Been Added to the Database");
  })
  .catch((error) => {
      console.error("Error saving data:", error);
      alert("Failed to save data. See console for details.");
  });
});

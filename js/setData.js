let submit = document.querySelector("#submit");
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "",
    authDomain: "folder-24d4a.firebaseapp.com",
    projectId: "folder-24d4a",
    storageBucket: "folder-24d4a.appspot.com",
    messagingSenderId: "256440210644",
    appId: "1:256440210644:web:244b521bde9a1aa728d741",
    measurementId: "G-32LGWTYVNN"
  };

  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase();

let dbRef = localStorage.getItem("Mobile");

const Title = document.getElementById("Title");
const Info = document.getElementById("Info");

function submitForm(e) {
  e.preventDefault()
  const DocTitle = Title.value;
  const DocInfo = Info.value;

  if (DocTitle && DocInfo) {
    const usersRef = push(ref(database, dbRef));
    set(usersRef, {
      Title: DocTitle,
      Info: DocInfo
    })
      .then(() => {
        alert("Document Added Successfully 🥰");
        location.reload();
        Title.value = "";
        Info.value = "";
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  } else {
    alert("Please enter both a Title and a Details.");
  }
}

submit.addEventListener("click", submitForm);
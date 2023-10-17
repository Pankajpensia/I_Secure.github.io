 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBhc0fk_t5q6xo4FySI9XXGHdEfLssCru8",
    authDomain: "folder-24d4a.firebaseapp.com",
    projectId: "folder-24d4a",
    storageBucket: "folder-24d4a.appspot.com",
    messagingSenderId: "256440210644",
    appId: "1:256440210644:web:244b521bde9a1aa728d741",
    measurementId: "G-32LGWTYVNN"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase();

    const submitButton = document.querySelector("#submitBtn");
    submitButton.addEventListener("click", async function (e) {
      e.preventDefault();
      const mobileNumber = document.getElementById("mobileNumber").value + "@gmail.com";
      const password = document.getElementById("password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, mobileNumber, password);
        const user = userCredential.user;
        console.log("Success! Welcome back!");
        alert("Login Successfully ! Welcome back!");

        const UserPath = mobileNumber.replace("@gmail.com", "");
        onValue(ref(database, `Users/${UserPath}`), (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            localStorage.setItem("FirstName", childData.FirstName);
            localStorage.setItem("LastName", childData.LastName);
            localStorage.setItem("Mobile", childData.Email);
            localStorage.setItem("ImageURL", childData.ImageURL);
          });
        });

        // Redirect to a new page or perform other actions
        window.open("Home.html");
      } catch (error) {
        alert("Login Error");
        console.log(error);
      }
    });
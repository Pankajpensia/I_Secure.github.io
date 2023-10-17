
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhc0fk_t5q6xo4FySI9XXGHdEfLssCru8",
authDomain: "folder-24d4a.firebaseapp.com",
projectId: "folder-24d4a",
storageBucket: "folder-24d4a.appspot.com",
messagingSenderId: "256440210644",
appId: "1:256440210644:web:244b521bde9a1aa728d741",
measurementId: "G-32LGWTYVNN"
  };
  let base64Image = '';
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase();

const registerForm = document.getElementById('register-form');


const imageInput = document.getElementById('file');


  imageInput.addEventListener('change', function () {
const selectedFile = imageInput.files[0];

if (selectedFile) {
  const reader = new FileReader();

  reader.onload = function (e) {
    base64Image = e.target.result;
    // Now you have the Base64-encoded image data
  };

  reader.readAsDataURL(selectedFile);
}
  });

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
 const firstName = document.getElementById('firstName');
 const lastName = document.getElementById('lastName');
 const email = document.getElementById('email');
 const password = document.getElementById('password');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value + "@gmail.com", password.value);
     setTimeout(() => {
          
  const FirstNameVal = firstName.value;
  const LasNameVal = lastName.value;
  const EmailVal = email.value;
  const PasswordVal = password.value;

  if (EmailVal && PasswordVal) {
const usersRef = push(ref(database, "Users/"+EmailVal));
set(usersRef, {
  FirstName: FirstNameVal,
  LastName: LasNameVal,
  Email: EmailVal,
  Password: PasswordVal,
  ImageURL: base64Image
})
  .then(() => {
    alert("Account Created Successfully 🥰 Please Go To Login Page");
       window.open("index.html")
  })
  .catch((error) => {
    console.error("Account Not Created 😥");
  });
  } else {
alert("Please Enter All Details");
  }  
     }, 500);

    // You can redirect or perform other actions here after successful registration.
  } catch (error) {
    alert('Registration error:' + error.massage);
    // Handle registration error here.
  }


});
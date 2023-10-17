let DocPage = document.querySelector("#DocContainer");

// let DocContainer = document.getElementById("DocContainer");
let DocNum = 1;

// Import Firebase modules using the new syntax
import { getDatabase, ref, onValue, remove, set, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhc0fk_t5q6xo4FySI9XXGHdEfLssCru8",
  authDomain: "folder-24d4a.firebaseapp.com",
  projectId: "folder-24d4a",
  storageBucket: "folder-24d4a.appspot.com",
  messagingSenderId: "256440210644",
  appId: "1:256440210644:web:244b521bde9a1aa728d741",
  measurementId: "G-32LGWTYVNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// You can set Mobile in sessionStorage if needed

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

window.addEventListener('load', () => {


  // Assume "Mobile" is the user identifier
  const userMobile = localStorage.getItem("Mobile");

  if (userMobile) {
    onValue(ref(database, userMobile), (snapshot) => {
      // Clear DocPage before appending new data
      DocPage.innerHTML = '';

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const Title = childData.Title;
        const Info = childData.Info;
        const documentId = childSnapshot.key;
        let Num = DocNum++;
        // Display data in the HTML
        DocPage.innerHTML += `<!-- Inside the loop where you display data -->
<li class="accordion-item">
  <a href="#" class="item-link item-content">
    <div class="item-inner">
      <div class="item-title">
        <button class="buttons" disabled style="margin-right:10px;">${Num}</button>${Title}
      </div>
      <button class="buttons copy-btn" style="position: absolute; background:green; right:30px; bottom: 10px;" data-clipboard-text="${Info}">
       <i class="fa-solid fa-copy"></i>
      </button>
    </div>
  </a>
  <div class="accordion-item-content" style="" aria-hidden="true">
    <p>
      <h2>${Info}</h2>
      
      <button class="buttons" style="position: absolute; right:10px; bottom: 10px; background:red;" data-document-id="${documentId}" data-delete-btn>
        <i class="fas fa-solid fa-trash"></i>
      </button>
    </p>
  </div>
</li>
`;
      });
      // Add click event listener to copy buttons
      const copyButtons = document.querySelectorAll(".copy-btn");

      copyButtons.forEach((btn) => {
        const clipboard = new ClipboardJS(btn);

        clipboard.on("success", function(e) {
          e.clearSelection();
          alert("Copied to clipboard!");
        });

        clipboard.on("error", function(e) {
          console.error("Clipboard copy failed:", e);
        });
      });

      // Add click event listener to delete buttons
      const deleteButtons = document.querySelectorAll("#delBtn");
      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const documentIdToDelete = event.target.getAttribute("data-document-id");
          if (documentIdToDelete) {
            const documentRefToDelete = ref(database, `${userMobile}/${documentIdToDelete}`);
            deleteDoc(documentRefToDelete);
          }
        });
      });
    });
  } else {
    console.error('User mobile number not found in sessionStorage');
  }
});

// Function to delete a document from Firebase
async function deleteDoc(docRef) {
  try {
    await remove(docRef);
    alert("Document successfully deleted!");
    location.reload();
  } catch (error) {
    console.error("Document deletion unsuccessful. Please try again!");
    setInterval(function() {
      location.reload();
    }, 500);
  }
}

let DocPage = document.querySelector("#DocContainer");
var localStorageLength = sessionStorage.length;
let DocumentCount = document.getElementById("DocumentCount")
// Iterate through localStorage keys
DocumentCount.innerHTML = localStorageLength;
for (var i = 0; i < localStorageLength; i++) {
  // Get the key at index i
  var key = sessionStorage.key(i);

  // Get the value associated with the key
  var value = sessionStorage.getItem(key);

  // Create an object to store key-value pairs
  var localStorageItems = {};

  // Store the key-value pair in the object
  localStorageItems[key] = value;

  // Append the list item to DocPage
  DocPage.innerHTML += `<li class="accordion-item accordion-item-opened">
        <a href="#" class="item-link item-content">
          <div class="item-inner">
            <div class="item-title"><i class="fas fa-check"></i>${key}</div>
          </div>
        </a>
        <div class="accordion-item-content" style="" aria-hidden="true">
          <p><h2>${value}</h2></p>
        </div>
      </li>`;
}

// Now, localStorageItems contains the last key-value pair only
console.log("localStorage items:", localStorageItems);

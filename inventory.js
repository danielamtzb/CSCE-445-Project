let inventory = [];

//Load inventory from localStorage when the page loads
window.onload = function() {
  let savedInventory = localStorage.getItem('inventory');
  if(savedInventory) {
    inventory = JSON.parse(savedInventory);
    if (window.location.pathname.endsWith('inventory.html')) {
      updateInventory();
    }
    //Check if items are in the inventory
    // Check if the current page is page1.html before calling checkShovel
    if (window.location.pathname.endsWith('storyPage1.html')) {
      checkShovel();
    }
    if (window.location.pathname.endsWith('storyPage2.html')) {
      checkCoconut();
    }
    if (window.location.pathname.endsWith('storyPage3.html')) {
      checkFlashlight();
    }
    if (window.location.pathname.endsWith('storyPage4.html')) {
      checkBandage();
    }
    if (window.location.pathname.endsWith('end.html')) {
      checkFinale();
    }
  }
};


function collectItem(itemName) {
  // Simulating collecting an item
  console.log("Attempting to collect item:", itemName); // Output a message indicating the item being removed
  
  if(itemName.trim() !== ""){
    inventory.push(itemName);
    if (window.location.pathname.endsWith('inventory.html')) {
      updateInventory();
    }
    saveInventory();
    console.log("Item added successfully.");
  } else{
    console.log("Item NOT added");
  }
}

function removeItem(itemName){
  console.log("Attempting to remove item:", itemName); // Output a message indicating the item being removed
  let index = inventory.indexOf(itemName);
  console.log("Item index:", index); // Output the index of the item in the inventory array

  if (index !== -1) {
    console.log("Item found, removing..."); // Output a message indicating that the item is being removed
    inventory.splice(index, 1);
    console.log("Item removed successfully."); // Output a message indicating successful removal
    updateInventory();
    saveInventory();
  } else {
    console.log("Item not found in inventory."); // Output a message indicating that the item was not found
  }
}

function updateInventory() {
  // Check if this is the inventory.html page before updating inventory
  if (!window.location.pathname.endsWith('inventory.html')) {
    return; // Exit the function if not on inventory.html
  }
  let inventoryList = document.getElementById("inventory-list");

  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    let itemElement = document.createElement("div");

    let image = document.createElement("img");
    image.src = `img/${item.toLowerCase()}.png`; // Assuming your image names match item names
    image.alt = item;
    image.style.width = "100px"; // Set width to 100px
    image.style.height = "100px"; // Set height to 100px
    itemElement.appendChild(image);

    inventoryList.appendChild(itemElement);
  });
}

//Selecting an image in inventory
document.addEventListener('DOMContentLoaded', function() {
  updateInventory(); // Update inventory when DOM is loaded

  // Add event listener to handle image clicks for selection
  let inventoryList = document.getElementById("inventory-list");
  inventoryList.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") { // Check if the clicked element is an image
      event.target.classList.toggle("selected"); // Toggle the "selected" class on the clicked image
      console.log("item selected");
    }
  });
});

function removeSelectedItems() {

  let selectedItems = document.querySelectorAll("#inventory-list img.selected");
  selectedItems.forEach(item => {
    let itemName = item.alt; // Get the item name from the image's alt attribute
    removeItem(itemName); // Call the removeItem function with the item name
  });
}

function saveInventory(){
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

/* Story Page 1 Conditional statement */
function checkShovel() {
  if (inventory.includes("shovel")) {
    document.getElementById("next-page-shovel").style.display = "inline-block";
  }
}
/* Story Page 2 Conditional statement */
function checkCoconut() {
  if (inventory.includes("coconut")) {
    document.getElementById("next-page-coconut").style.display = "inline-block";
  }
}
/* Story Page 3 Conditional statement */
function checkFlashlight() {
  if (inventory.includes("flashlight")) {
    document.getElementById("next-page-flashlight").style.display = "inline-block";
  }
}
/* Story Page 4 Conditional statement */
function checkBandage() {
  if (inventory.includes("bandage")) {
    document.getElementById("next-page-bandage").style.display = "inline-block";
  }
}
/* Story Finale Conditional statement */
function checkFinale() {
  if (inventory.includes("flower") && inventory.includes("shell") && inventory.includes("diamond") && inventory.includes("shield")) {
    document.getElementById("characters-finale").style.display = "inline-block";
  }
}

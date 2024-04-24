let inventory = [];

//Load inventory from localStorage when the page loads
window.onload = function() {
  let savedInventory = localStorage.getItem('inventory');
  if(savedInventory) {
    inventory = JSON.parse(savedInventory);
    if (window.location.pathname.endsWith('inventory.html')) {
      updateInventory();
    }
    checkShovel(); //check shovel status when page loads
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
    location.reload();
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

function checkItem(itemName) {
  return inventory.includes(itemName);
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
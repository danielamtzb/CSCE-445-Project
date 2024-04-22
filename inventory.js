let inventory = [];

//Load inventory from localStorage when the page loads
window.onload = function() {
  let savedInventory = localStorage.getItem('inventory');
  if(savedInventory) {
    inventory = JSON.parse(savedInventory);
    updateInventory();
  }
};

function collectItem(itemName) {
  // Simulating collecting an item
  if(itemName.trim() !== ""){
    inventory.push(itemName);
    updateInventory();
    saveInventory();
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
  let inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    let itemElement = document.createElement("div");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item;
    itemElement.appendChild(checkbox);

    let label = document.createElement("label");
    label.textContent = item;
    itemElement.appendChild(label);

    inventoryList.appendChild(itemElement);
  });
}


function removeSelectedItems() {
  let checkboxes = document.querySelectorAll("#inventory-list input[type='checkbox']:checked");
  checkboxes.forEach(checkbox => {
    let itemName = checkbox.value;
    removeItem(itemName);
  });
}


function saveInventory(){
  localStorage.setItem('inventory', JSON.stringify(inventory));
}
let inventory = [];

function collectItem() {
  // Simulating collecting an item
  let newItem = "Item " + (inventory.length + 1);
  inventory.push(newItem);
  updateInventory();
}

function updateInventory() {
  let inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    let itemElement = document.createElement("div");
    itemElement.textContent = item;
    inventoryList.appendChild(itemElement);
  });
}

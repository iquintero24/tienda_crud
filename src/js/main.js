// DOM references
const $dom = {
  form: document.getElementById("formProduct"),
  productNameInput: document.getElementById("productName"),
  productPriceInput: document.getElementById("productPrice"),
  productNameEditInput: document.getElementById("productNameEdit"),
  productPriceEditInput: document.getElementById("productPriceEdit"),
  productContainer: document.getElementById("product"),
  editForm: document.getElementById("formProductEdit"),
  editButton: document.getElementById("editbutton"),
};

const inventory = [];

/**
 * Saves a new product to the inventory if it does not already exist.
 * @param {string} name - Product name.
 * @param {number} price - Product price.
 * @returns {boolean} - True if product was added, false if it already exists.
 */
function saveProduct(name, price) {
  const normalizedName = name.trim().toLowerCase();
  const alreadyExists = inventory.some((item) => item.name === normalizedName);

  if (alreadyExists) return false;

  const newProduct = {
    id: crypto.randomUUID(),
    name: normalizedName,
    price: price,
  };

  inventory.push(newProduct);
  return true;
}

/**
 * Renders the list of products in the DOM.
 * Also attaches edit and delete event listeners to each button.
 */
function renderProducts() {
  $dom.productContainer.innerHTML = "";

  inventory.forEach((product) => {
    $dom.productContainer.innerHTML += `
      <article>
        <div class="products__value">
            <p><span class="montserrat-title">Product Name:</span> ${product.name}</p>
            <p><span class="montserrat-title">Product Price:</span> ${product.price}</p>
        </div>

        <div class="products__buttons">
            <button class="edit-button" data-id="${product.id}">Edit</button>
            <button class="delete-button" data-id="${product.id}" type="button">Delete</button>
        </div>
      </article>
      <br>
    `;
  });

  $dom.productContainer.style.display = "flex";

  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  // Attach edit event to each edit button
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      const product = inventory.find((p) => p.id === productId);

      if (!product) return;

      $dom.form.style.display = "none";
      $dom.editForm.style.display = "flex";

      $dom.productNameEditInput.value = product.name;
      $dom.productPriceEditInput.value = product.price;

      $dom.editForm.setAttribute("data-edit-id", productId);
    });
  });

  // Attach delete event to each delete button
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      const index = inventory.findIndex((p) => p.id === productId);

      if (index !== -1) {
        inventory.splice(index, 1); // Remove product
        renderProducts(); // Re-render product list
      }
    });
  });
}

// Handle product edit form submission
$dom.editButton.addEventListener("click", (e) => {
  e.preventDefault();

  const productId = $dom.editForm.getAttribute("data-edit-id");
  const updatedName = $dom.productNameEditInput.value;
  const updatedPrice = $dom.productPriceEditInput.value;

  const normalizedName = updatedName.trim().toLowerCase();

  // Check if another product has the same name
  const nameConflict = inventory.some(
    (item) => item.name === normalizedName && item.id !== productId
  );

  if (nameConflict) {
    alert(`A product with the name "${updatedName}" already exists.`);
    return;
  }

  const index = inventory.findIndex((p) => p.id === productId);
  if (index !== -1) {
    inventory[index].name = normalizedName;
    inventory[index].price = updatedPrice;
  }

  $dom.editForm.style.display = "none";
  $dom.form.style.display = "flex";

  renderProducts();
});

// Handle new product form submission
$dom.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $dom.productNameInput.value;
  const price = parseInt($dom.productPriceInput.value, 10);

  if (!name) {
    alert("Product name is required.");
    return;
  }

  if (isNaN(price)) {
    alert("Product price must be a valid number.");
    return;
  }

  const success = saveProduct(name, price);

  if (!success) {
    alert(`A product with the name "${name}" already exists in the inventory.`);
  } else {
    renderProducts();
  }

  $dom.form.reset();
});

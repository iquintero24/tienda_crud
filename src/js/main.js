const $dom = {
  form: document.getElementById("formProduct"),
  nameProduct: document.getElementById("productName"),
  priceProduct: document.getElementById("productPrice"),
  nameProductEdit: document.getElementById("productNameEdit"),
  priceProductEdit: document.getElementById("productPriceEdit"),
  product: document.getElementById("product"),
  formEdit: document.getElementById("formProductEdit"),
  editButton: document.getElementById("editbutton"),
};

const inventary = [];

function saveObject(name, price) {
  const normalizedName = name.trim().toLowerCase();
  const Exists = inventary.some((item) => item.name === normalizedName);

  if (Exists) return false;

  const newProduct = {
    id: crypto.randomUUID(),
    name: normalizedName,
    price: price,
  };

  inventary.push(newProduct);
  return true;
}
function getProduct() {
  $dom.product.innerHTML = "";

  inventary.forEach((product) => {
    $dom.product.innerHTML += `
    <article>
      <div class="products__value">
          <p><span class="montserrat-title">Name Product:</span> ${product.name}</p>
          <p><span class="montserrat-title">Price Product:</span>  ${product.price}</p>
      </div>

      <div class="products__buttons">
          <button class="editar" data-id="${product.id}">Editar</button>
          <button class="eliminar" type="submit" name="submit">Eliminar</button>
      </div>

    
    </article>
    <br>
    `;
  });

  $dom.product.setAttribute("style", "display:flex;");
  const editButtons = document.querySelectorAll(".editar");

  // Agregar el evento click a cada botón "Editar"
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      // Aquí puedes agregar la lógica para editar el producto
      const product = inventary.find((p) => p.id == productId); // Buscar el producto por ID
      console.log(product);

      $dom.form.setAttribute("style", "display:none;");
      $dom.formEdit.setAttribute("style", "display:flex;");

      $dom.nameProductEdit.value = product.name;
      $dom.priceProductEdit.value = product.price;

      $dom.formEdit.setAttribute("data-edit-id", productId);
    });
  });
}

$dom.editButton.addEventListener("click", () => {
  const productId = $dom.editForm.getAttribute("data-edit-id");
  const updatedName = $dom.nameProductEdit.value;
  const updatedPrice = $dom.priceProductEdit.value;

  // Actualizar el producto en el inventario
  const productIndex = inventary.findIndex((p) => p.id == productId);
  if (productIndex !== -1) {
    inventary[productIndex].name = updatedName;
    inventary[productIndex].price = updatedPrice;
  }

  $dom.formEdit.setAttribute("style", "display:none;");
  $dom.form.setAttribute("style", "display:flex;");

  getProduct();
});

$dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $dom.nameProduct.value;
  const price = parseInt($dom.priceProduct.value, 10);

  if (!name) {
    alert("El nombre del producto es obligatorio");
    return;
  }

  if (isNaN(price)) {
    alert("El precio debe ser un número válido");
    return;
  }

  const success = saveObject(name, price);
  if (!success) {
    alert(`Product with ${name} name already exists in inventory`);
  } else {
    getProduct();
  }

  $dom.form.reset();
});

const $dom = {
  form: document.getElementById("formProduct"),
  nameProduct: document.getElementById("productName"),
  priceProduct: document.getElementById("productPrice"),
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
  return true
}

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
  if(!success) {
    alert(`Product with ${name} name already exists in inventory`);
  }
});

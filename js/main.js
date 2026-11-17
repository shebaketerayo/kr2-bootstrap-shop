const products = {
  keyboard: {
    name: "Механическая клавиатура Keyra K1",
    price: "5 990",
    description:
      "Компактная клавиатура формата 75% с тихими переключателями и белой подсветкой.",
    specs: [
      ["Формат", "75%, 84 клавиши"],
      ["Подключение", "USB-C, Bluetooth 5.0"],
      ["Подсветка", "Белая, три уровня"],
    ],
  },
  mouse: {
    name: "Беспроводная мышь Glide M2",
    price: "2 490",
    description:
      "Лёгкая беспроводная мышь с датчиком 3200 DPI и тихими кнопками.",
    specs: [
      ["Подключение", "Беспроводное"],
      ["Разрешение", "3200 DPI"],
      ["Кнопки", "Тихие"],
    ],
  },
  mat: {
    name: "Коврик для стола Deskmat L",
    price: "1 290",
    description:
      "Большой коврик 80×30 см с прошитыми краями и нескользящей основой.",
    specs: [
      ["Размер", "80 × 30 см"],
      ["Края", "Прошитые"],
      ["Основа", "Нескользящая"],
    ],
  },
};
const params = new URLSearchParams(location.search);
const productName = document.getElementById("product-name");
if (productName) {
  const id = Object.hasOwn(products, params.get("id"))
    ? params.get("id")
    : "keyboard";
  const item = products[id];
  productName.textContent = item.name;
  document.title = `${item.name} — ShopProject`;
  document.getElementById("crumb").textContent = item.name;
  document.getElementById("product-description").textContent = item.description;
  document.getElementById("product-price").textContent = `${item.price} ₽`;
  const picture = document.getElementById("product-image");
  picture.src = `images/${id}.svg`;
  picture.alt = item.name;
  document.getElementById("product-order").href = `order.html?product=${id}`;
  const specs = document.getElementById("product-specs");
  specs.replaceChildren();
  item.specs.forEach(([label, value]) => {
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = label;
    const td = document.createElement("td");
    td.textContent = value;
    row.append(th, td);
    specs.append(row);
  });
}
const form = document.getElementById("order-form");
if (form) {
  const select = document.getElementById("product");
  if (Object.hasOwn(products, params.get("product")))
    select.value = params.get("product");
  function updateSummary() {
    const summary = document.getElementById("summary");
    const item = products[select.value];
    summary.replaceChildren();
    if (!item) {
      const text = document.createElement("p");
      text.className = "text-secondary mb-0";
      text.textContent = "Выберите товар в форме, чтобы увидеть его здесь.";
      summary.append(text);
      return;
    }
    const row = document.createElement("div");
    row.className = "d-flex align-items-center gap-3 mt-3";
    const img = document.createElement("img");
    img.src = `images/${select.value}.svg`;
    img.alt = "";
    img.className = "summary-image";
    const info = document.createElement("div");
    const name = document.createElement("div");
    name.textContent = item.name;
    const price = document.createElement("strong");
    price.textContent = `${item.price} ₽`;
    info.append(name, price);
    row.append(img, info);
    summary.append(row);
  }
  select.addEventListener("change", updateSummary);
  updateSummary();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }
    if (window.bootstrap)
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("successModal"),
      ).show();
    else
      alert(
        "Форма успешно заполнена. Это демонстрация: данные не отправляются.",
      );
  });
}

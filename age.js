const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "create";
let max;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#56e656";
  } else {
    total.innerHTML = "";
    total.style.background = "wheat";
  }
}
// -------array / localSorage =>
let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}
// ---button-create / update =>
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        data.push(newPro);
      }
    } else {
      data.push(newPro);
    }
  } else {
    data[max] = newPro;
    mood = "create";
    submit.innerHTML = "create";
    submit.style.background = "#040275";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(data));
  clear();
  show();
};

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// ----read --showData =>
function show() {
  let table = "";
  for (let x = 0; x < data.length; x++) {
    table += `
    <tr>
        <td>${x}</td>
        <td>${data[x].title}</td>
        <td>${data[x].price}</td>
        <td>${data[x].taxes}</td>
        <td>${data[x].ads}</td>
        <td>${data[x].discount}</td>
        <td>${data[x].total}</td>
        <td>${data[x].category}</td>
        <td><button onclick="updateData(${x})" id="update">update</button></td>
        <td><button  onclick="deleteData(${x})" id="delete" >delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndeleteAll = document.querySelector("#deleteAll");
  if (data.length > 0) {
    btndeleteAll.innerHTML = `
      <button onclick="deleteAll()" id="deleteAl"> Delete All ( ${data.length} )</button>
      `;
  } else {
    btndeleteAll.innerHTML = "";
  }
  getTotal();
}
show();

// -------singelDelete =>
function deleteData(x) {
  data.splice(x, 1);
  localStorage.product = JSON.stringify(data);
  show();
}
let btnAll = document.getElementById("btnAll");
function deleteAll() {
  localStorage.clear();
  data.splice(0);
  btnAll.style.background = "wheat";
  show();
}
// ------update  =>
function updateData(x) {
  title.value = data[x].title;
  price.value = data[x].price;
  taxes.value = data[x].taxes;
  ads.value = data[x].ads;
  discount.value = data[x].discount;
  getTotal();
  count.style.display = "none";
  category.value = data[x].category;
  submit.innerHTML = "update";
  submit.style.background = "green";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  //   متغير وهمي
  max = x;
}

let searchmood = "title";

function getSearch(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchmood = "title";
    search.placeholder = "search By Title";
  } else {
    searchmood = "category";
    search.placeholder = "search By category";
  }
  search.focus();
  search.value = "";
  show();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (searchmood == "title") {
      if (data[i].title.includes(value)) {
        table += `
    <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    } else {
      if (data[i].category.includes(value)) {
        table += `
      <tr>
          <td>${i}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

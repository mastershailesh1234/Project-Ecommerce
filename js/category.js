document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get("type");
  let getapi = "https://dummyjson.com/products/";
  let getapi2 = "https://dummyjson.com/products/category/";
  let searchapi = "";
  if (category != "all") {
    getapi2 += category;
    searchapi = getapi2;
  } else {
    searchapi = getapi;
  }
  async function fetchall(searchapi) {
    console.log(searchapi);
    try {
      let data = await fetch(searchapi);
      let response = await data.json();
      console.log(response.products[0]);
      response = response.products;
      for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        products.innerHTML += `
         <div class="product">
             <img src="${response[i].thumbnail}" alt="${
          response[i].category
        }" class="product-img">
             <div class="product-content">
             <div class="product-price-container">
             <h2 class="product-title">${
               title.length > 18 ? title.substring(0, 18).concat(" ...") : title
             }</h2>
             <h5 style="color:green">${response[i].rating}/5</h5>
             </div>
             <h4 class="product-category">${response[i].category}</h4>
             <p class="product-description">${
               description.length > 80
                 ? description.substring(0, 80).concat(" ...more")
                 : description
             }</p>
             <div class="product-price-container">
                 <h3 class="product-price">
                  <s>$${response[i].price}</s>
                  $${Math.floor(
                    response[i].price *
                      (1 - response[i].discountPercentage / 100)
                  )}
                 </h3>
                 <a href="/product.html?id=${response[i].id}" data-productId="${
          response[i].id
        }" class="add-to-cart">VIEW</a>
             </div>
             <p style="color:red">${Math.ceil(
               response[i].discountPercentage
             )}% Discount</p>
             </div>

         </div>
         `;
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchall(searchapi);
});

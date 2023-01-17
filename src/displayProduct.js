const productContainer = document.querySelector('.product-container-main');
const btnContainer = document.querySelector('.btn-container');

class ShowProduct {
  // show product according to user select;
  renderSelectedProducts(products) {
    btnContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.product-btn');

      const selectedProdcucts = products.filter(
        (product) => product.category === btn.textContent.toLowerCase()
      );
      productContainer.innerHTML = '';
      if (btn.textContent === 'All') {
        this.displayproducts(products);
      } else {
        this.displayproducts(selectedProdcucts);
      }
    });
  }

  displayproducts(products, editFlag = true) {
    products.forEach((product) => {
      const markup = `
    <div class="product-container">
            <div class="product-cover">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="product-photo"
              />
            </div>
            <div class="product-content">
              <p class="title-text">
               ${product.title}
              </p>

              <p class="price">
                $
                <span>${product.price}</span>
              </p>

              <p class="rating">
                Rating ${product.rating}
                <i class="fa-solid fa-star"></i>
              </p>

              <button data-id="${product.id}" class="shop-btn">SHOP</button>

              <button class="wishlist-btn" data-id="${product.id}">
                <ion-icon data-id="${product.id}" class="${
        !editFlag ? '.heart-icon.selected' : 'heart-icon'
      }" name="heart"></ion-icon>
              </button>
            </div>
          </div>

    `;

      productContainer.insertAdjacentHTML('beforeend', markup);
    });
  }
}

export default new ShowProduct();

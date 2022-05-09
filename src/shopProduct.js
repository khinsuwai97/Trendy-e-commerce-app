const productContainer = document.querySelector(".product-container-main");
const productDetailContainer = document.querySelector(".product-detail");


class ShopProduct {
  // show product detail when user click shop btn
  showDetail(products) {
    this.products = products;

    productContainer.addEventListener("click", (e) => {
      const shopBtn = e.target.closest(".shop-btn");
      if (!shopBtn) return;
      const btnId = +shopBtn.dataset.id;

      const detail = this.products.find((product) => product.id === btnId);
      this.showProductDetail(detail);
      const detailList = productDetailContainer.querySelector(
        ".product-detil-list"
      );

      const btnClose = detailList.querySelector(".btn-close-detail");

      detailList.classList.add("show-detail");

      btnClose.addEventListener("click", () => {
        detailList.classList.remove("show-detail");
      });
    });
  }

  showProductDetail(product) {
    productDetailContainer.innerHTML = "";
    const markup = `
    <div class="product-detil-list">
        <button class="btn-close-detail">
          <ion-icon
            class="btn-circle-detail"
            name="close-circle-outline"
          ></ion-icon>
        </button>
        <div class="image-box">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="product-photo-detail"
          />
        </div>
        <div class="product-list">
          <p class="product-category">${product.category}</p>
          <p class="product-title">${product.title}</p>
          <p class="product-rating">
            Rating 3.9
            <i class="fa-solid fa-star"></i>
          </p>
          <p class="product-price">
            $
            <span>${product.price}</span>
          </p>
          <p class="product-description">
           ${product.description}
          </p>
          <div class="btn-cart">
            <button class="add-to-cart add-to-bag" data-id="${product.id}"}>Add to Bag</button>
          
           
          </div>
        </div>
      </div>
    `;
    productDetailContainer.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ShopProduct();

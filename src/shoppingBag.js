const productDetailContainer = document.querySelector(".product-detail");
const cartItem = document.querySelector(".cart-item");
const cartTotal = document.querySelector(".cart-total");
const bagOverlay = document.querySelector(".bag-overlay");
const bagContent = document.querySelector(".bag-content");
const bagContainer = document.querySelector(".bag");
const closeBagBtn = document.querySelector(".btn-close-bag");
const addToBagBtn = document.querySelector(".btn-bag");
const clearBtn = document.querySelector(".clear-bag");

let cart = [];

class ShoppingBag {
  addToShoppingBag(products) {
    productDetailContainer.addEventListener("click", (e) => {
      const bagBtn = e.target.closest(".add-to-bag");
      if (bagBtn === null && !bagBtn) return;
      const btnId = +bagBtn.dataset.id;

      const productDetail = productDetailContainer.querySelector(
        ".product-detil-list"
      );

      // hide show product detail when the user add product to bag
      setTimeout(() => productDetail.classList.remove("show-detail"), 1000);

      if (cart.some((item) => item.id === btnId)) {
        bagBtn.textContent = "This item is already in your shopping bag";
        bagBtn.disabled = true;
      } else {
        const cartItems = products.find((product) => product.id === btnId);
        cart = [...cart, cartItems];

        // showBagValue
        this.showBagValue(cart);

        // save local storage
        Storage.saveLocalStorage(cart);

        // display add to bag
        this.displayAddToBag(cartItems);

        //show addto bag
        this.showBag();
      }
    });
  }

  showBagValue(cart) {
    let tempItem = 0;
    let tempTotal = 0;
    cart.map((item) => {
      tempItem += item.amount;

      tempTotal += item.amount * item.price;
    });
    cartItem.textContent = tempItem;
    cartTotal.textContent = Number(tempTotal.toFixed(2));
  }

  displayAddToBag(item) {
    const markup = `
     <div class="bag-item">
            <div class="add-to-function">
              <img
                class="bag-img"
                src="${item.image}"
                alt="product"
              />
              <div class="add-to-detail">
                <p class="add-to-title add-to-item">
                  ${item.title}
                </p>
                <p class="add-to-price add-to-item">
                  $
                  <span class="add-to-bag-price">${item.price}</span>
                </p>
                <button class="trash-btn" data-id="${item.id}">
                  <ion-icon
                    class="bag-trash-btn" data-id="${item.id}"
                    name="trash-outline"
                  ></ion-icon>
                </button>
              </div>
            </div>

            <div class="qty">
              <p class="quantity">Qty</p>
              <i class="fas fa-chevron-up" data-id="${item.id}"></i>

              <p class="qty-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>
  
          </div>
    `;
    bagContent.insertAdjacentHTML("afterbegin", markup);
  }

  showBag() {
    bagContainer.classList.add("showBag");
    bagOverlay.classList.add("transparent-bag");
  }

  hideBag() {
    bagContainer.classList.remove("showBag");
    bagOverlay.classList.remove("transparent-bag");
  }

  displayShoppingBag(cart) {
    cart.forEach((item) => this.displayAddToBag(item));
  }

  SetupShoppingBag() {
    cart = Storage.getLocalStorage();
    this.showBagValue(cart);
    this.displayShoppingBag(cart);

    addToBagBtn.addEventListener("click", this.showBag);
    closeBagBtn.addEventListener("click", this.hideBag);
  }

  shoppingBagLogic(e) {
    if (e.target.classList.contains("bag-trash-btn")) {
      const removeItem = e.target;
      const id = +removeItem.dataset.id;
      removeItem.closest(".bag-item").remove();
      this.removeItems(id);
    } else if (e.target.classList.contains("fa-chevron-up")) {
      const item = e.target;
      const id = +item.dataset.id;
      const itemIncrease = cart.find((product) => product.id === id);
      itemIncrease.amount++;
      Storage.saveLocalStorage(cart);
      this.showBagValue(cart);
      const quantity = item.nextElementSibling;
      quantity.textContent = itemIncrease.amount;
    } else if (e.target.classList.contains("fa-chevron-down")) {
      const item = e.target;
      const id = +item.dataset.id;

      const itemDecrease = cart.find((product) => product.id === id);
      itemDecrease.amount--;
      if (itemDecrease.amount > 0) {
        Storage.saveLocalStorage(cart);
        this.showBagValue(cart);
        const quantity = item.previousElementSibling;
        quantity.textContent = itemDecrease.amount;
      } else {
        item.closest(".bag-item").remove();
        this.removeItems(id);
      }
    }
  }

  addToBagLogic() {
    clearBtn.addEventListener("click", this.clearBag.bind(this));
    bagContainer.addEventListener("click", (e) => {
      this.shoppingBagLogic(e);
    });
  }

  // clear the whole cart
  clearBag() {
    let items = cart.map((item) => item.id);
    items.forEach((id) => this.removeItems(id));
    const allItems = bagContent.querySelectorAll(".bag-item");
    if (allItems.length > 0) {
      allItems.forEach((item) => item.remove());
    }
    this.hideBag();
  }
  // remove  item
  removeItems(id) {
    cart = cart.filter((item) => item.id !== id);
    this.showBagValue(cart);
    Storage.saveLocalStorage(cart);
  }
}

//local storage
class Storage {
  static saveLocalStorage(cart) {
    localStorage.setItem("bag", JSON.stringify(cart));
  }

  static getLocalStorage() {
    return localStorage.getItem("bag")
      ? JSON.parse(localStorage.getItem("bag"))
      : [];
  }
}

export default new ShoppingBag();

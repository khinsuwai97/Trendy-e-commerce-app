const wishlistBtn = document.querySelector(".wishlist--btn");
const navHeartBtn = wishlistBtn.querySelector(".heart-icon");
const closeWishlistBtn = document.querySelector(".btn-close-wishlist");
const productContainer = document.querySelector(".product-container-main");
const wishlistContent = document.querySelector(".wishlist-content");
const wishlistOverlay = document.querySelector(".wishlist-overlay");
const wishlistContainer = document.querySelector(".wishlist");
const clearWishListBtn = document.querySelector(".clear-wishlist-btn");

let cart = [];

class Wishlist {
  addToWishlist(products) {
    productContainer.addEventListener("click", (e) => {
      const heartBtn = e.target.closest(".wishlist-btn");
      if (heartBtn === null && !heartBtn) return;
      const heartIcon = heartBtn.firstElementChild;

      const btnId = +heartBtn.dataset.id;

      if (cart.some((item) => item.id === btnId)) {
        alert("This item is already in your wishlist");
      } else {
        const wishlistItems = products.find((item) => item.id == btnId);
        heartIcon.classList.toggle("selected");
        navHeartBtn.classList.toggle("selected");

        // console.log(wishlistItems);
        cart = [...cart, wishlistItems];

        //display wishlist
        this.displayWishList(wishlistItems);
        //save localstorage
        Storage.saveWishlist(cart);

        //showWishList
        this.showWishlist();
      }
    });
  }

  displayWishList(item) {
    const markup = `
      <div class="wishlist-function">
              <img
                class="bag-img"
                src="${item.image}"
                alt="${item.title}"
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
                    class="bag-trash-btn wishlist-trash"
                    name="trash-outline"
                  ></ion-icon>
                </button>
              </div>
            </div>
            </div>
    `;
    wishlistContent.insertAdjacentHTML("afterbegin", markup);
  }

  displayWishListItem(cart) {
    cart.forEach((item) => this.displayWishList(item));
  }

  showWishlist() {
    wishlistOverlay.classList.add("transparent-wishlist");
    wishlistContainer.classList.add("show-wishlist");
  }

  hideWishlist() {
    wishlistOverlay.classList.remove("transparent-wishlist");
    wishlistContainer.classList.remove("show-wishlist");
  }

  setupWishList() {
    cart = Storage.getWishlist();

    this.displayWishListItem(cart);
    wishlistBtn.addEventListener("click", this.showWishlist);
    closeWishlistBtn.addEventListener("click", this.hideWishlist);
    clearWishListBtn.addEventListener("click", () => {
      this.clearWishList();
    });
  }

  //delete each item
  removeWishListItem() {
    wishlistContainer.addEventListener("click", (e) => {
      const trashBtn = e.target.closest(".trash-btn");
      if (trashBtn === null && !trashBtn) return;
      const id = +trashBtn.dataset.id;
      this.removeItem(id);
      const removeItem = trashBtn.parentElement.parentElement;
      removeItem.remove();
    });
  }

  // clear the whole wishlist
  clearWishList() {
    const itemId = cart.map((item) => item.id);
    itemId.forEach((id) => this.removeItem(id));
    const removeItems =
      wishlistContainer.querySelectorAll(".wishlist-function");
    if (removeItems.length > 0) {
      removeItems.forEach((item) => item.remove());
    }
    this.hideWishlist();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    Storage.saveWishlist(cart);
  }
}

export default new Wishlist();

export class Storage {
  static saveWishlist(cart) {
    localStorage.setItem("wishlist", JSON.stringify(cart));
  }

  static getWishlist() {
    return localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
  }
}

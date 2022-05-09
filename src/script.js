import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import getProducts from "./getProduct.js";
import { products } from "./getProduct.js";
import uiDomManipulation from "./DOM.js";
import showProduct from "./displayProduct.js";
import shopProduct from "./shopProduct.js";
import shoppingBag from "./shoppingBag.js";
import wishlist from "./wishlist.js";

const init = async function () {
  await getProducts();
  showProduct.displayproducts(products, true);
  showProduct.renderSelectedProducts(products);
  shopProduct.showDetail(products);
  shoppingBag.addToShoppingBag(products);
  wishlist.addToWishlist(products);
  wishlist.removeWishListItem();
};
init();

//when the page load, show user add to bag function and wishlist function
document.addEventListener("DOMContentLoaded", () => {
  shoppingBag.SetupShoppingBag();
  shoppingBag.addToBagLogic();
  wishlist.setupWishList();
});

//dom manipulation for UI
const domSection = function () {
  uiDomManipulation();
};

domSection();

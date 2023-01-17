import { async } from 'regenerator-runtime';
const productContainer = document.querySelector('.product-container-main');

const url = 'https://fakestoreapi.com/products';

export let products = [];

const showLoadingSpinner = () => {
  const spinner = `
  
  <div class="loader"></div>
`;
  productContainer.innerHTML = '';
  productContainer.insertAdjacentHTML('afterbegin', spinner);
  const loader = document.querySelector('.loader');
  loader.classList.add('display');
  productContainer.classList.add('loader-container');
};
const hideLoadingSpinner = () => {
  const spinner = `

  <div class="loader"></div> 

  `;
  productContainer.insertAdjacentHTML('afterbegin', spinner);
  const loader = document.querySelector('.loader');
  loader.classList.remove('display');
  productContainer.innerHTML = '';
  productContainer.classList.remove('loader-container');
};

//get product from Api
const getProducts = async function () {
  try {
    //Loading spinner
    showLoadingSpinner();

    // fetch Products
    const res = await fetch(url);

    if (!res.ok)
      throw new Error("Coldn't find the product! Please try again:)");

    const data = await res.json();
    hideLoadingSpinner();

    products = data.map((product) => {
      return {
        id: product.id,
        image: product.image,
        product: product.title,
        category: product.category,
        price: product.price,
        rating: product.rating.rate,
        title: product.title,
        description: product.description,
        amount: 1,
      };
    });
  } catch (err) {
    console.error(`${err.message}`);
    throw err;
  }
};

export default getProducts;

import { async } from "regenerator-runtime";

const url = "https://fakestoreapi.com/products";

export let products = [];

//get product from Api
const getProducts = async function () {
  try {
    const res = await fetch(url);

    if (!res.ok)
      throw new Error("Coldn't find the product! Please try again:)");

    const data = await res.json();

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

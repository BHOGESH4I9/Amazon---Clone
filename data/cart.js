import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: '2'
    },
  ];
}

function saveToLocalstorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: '1'  // default delivery
    });
  }

  saveToLocalstorage();
}

export function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  saveToLocalstorage();
}

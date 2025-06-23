import { cart, removeProductFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurreny from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderCart() {
  let cartProductsHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    cartProductsHtml += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${getDeliveryDate(cartItem)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurreny(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-product"
                    data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-cartProducts").innerHTML = cartProductsHtml;

  document.querySelectorAll(".js-delete-product").forEach((link) => {
    link.addEventListener("click", () => {
      const productID = link.dataset.productId.trim();
      removeProductFromCart(productID);
      renderCart();
    });
  });
}

function deliveryOptionsHTML(matchingProduct) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'Free'
      : `$${formatCurreny(deliveryOption.priceCents)} - `;

    html += `
      <div class="delivery-option">
        <input type="radio" checked
               class="delivery-option-input"
               name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function getDeliveryDate(cartItem) {
  const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId || option.id === cartItem.deliveryOptions);
  const date = dayjs().add(deliveryOption?.deliveryDays || 7, 'day');
  return date.format('dddd, MMMM D');
}

renderCart();

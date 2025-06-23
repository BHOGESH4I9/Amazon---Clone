import { cart,
  removeProductFromCart,
  updateDeliveryOption,} from '../../data/cart.js'

import { products, getProduct } from '../../data/products.js';
import formatCurreny from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOptionsId } from "../../data/deliveryOptions.js";
import renderPaymentSummary from './paymentSummary.js';


export function renderCart() {
  let cartProductsHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    
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
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
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
            ${deliveryOptionsHTML(cartItem)}
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
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", () => {
      const parent = input.closest(".js-delivery-option");
      const productID = parent.dataset.productId.trim();
      const deliveryOptionId = parent.dataset.deliveryOptionId.trim();

      updateDeliveryOption(productID, deliveryOptionId);

      setTimeout(() => {
        renderCart();
        renderPaymentSummary();
      }, 50);
    });
  });
}

function deliveryOptionsHTML(cartItem) {
  const matchingProduct = products.find(p => p.id === cartItem.productId);
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "Free"
        : `$${formatCurreny(deliveryOption.priceCents)} - `;

    const selectedOptionId = getDeliveryOptionsId(cartItem.productId);
    const isChecked = deliveryOption.id === selectedOptionId ? "checked" : "";

    html += `
  <label class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">

    <input type="radio" ${isChecked}
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
  </label>
`;
  });

  return html;
}


function getDeliveryDate(cartItem) {
  const deliveryOption = deliveryOptions.find(
    (option) => option.id === cartItem.deliveryOptionsId
  );
  const date = dayjs().add(deliveryOption?.deliveryDays || 7, "day");
  return date.format("dddd, MMMM D");
}



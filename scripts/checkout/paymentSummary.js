import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurreny from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOptionsId,
} from "../../data/deliveryOptions.js";

function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    0;
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const selectedDeliveryOption = getDeliveryOptionsId(cartItem.productId);
    shippingPriceCents += selectedDeliveryOption.priceCents;
  });

  const totBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totBeforeTaxCents * 0.1;

  const totCents = totBeforeTaxCents + taxCents;

  const paymentHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurreny(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurreny(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurreny(
              totBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurreny(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurreny(totCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

  const summaryContainer = document.querySelector(".js-payment-summary");
  if (summaryContainer) {
    summaryContainer.innerHTML = paymentHTML;
  } else {
    console.error("Container '.js-payment-summary' not found in DOM.");
  }
}

export default renderPaymentSummary;

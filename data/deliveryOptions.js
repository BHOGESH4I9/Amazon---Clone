import { cart } from "./cart.js";

export const deliveryOptions = [
  { id: '1', deliveryDays: 7, priceCents: 0 },
  { id: '2', deliveryDays: 3, priceCents: 499 },
  { id: '3', deliveryDays: 1, priceCents: 999 }
];

export function getDeliveryOptionsId(productId) {
  const cartItem = cart.find(item => item.productId === productId);
  return deliveryOptions.find(opt => opt.id === cartItem?.deliveryOptionsId) || deliveryOptions[0];
}


export const money = cents => new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(cents / 100);
export function totals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.1);
  return { subtotal, discount, total: subtotal - discount };
}
export function addLine(cart, dish, options) {
  const key = JSON.stringify([dish.id, options.spice, options.vegan, options.note]);
  const existing = cart.find(item => item.key === key);
  if (existing) return cart.map(item => item.key === key ? { ...item, quantity: Math.min(30, item.quantity + options.quantity) } : item);
  return [...cart, { key, id: dish.id, name: dish.name, price: dish.price, minQty: dish.minQty, ...options }];
}

import { ICart } from 'coding/basic';
import { uniq } from 'lodash';

export const products = [{ id: 1, name: 'pizza' }];

// Can check if product already exists
export const checkProduct = (id: number) => {
  const found = products.find((data) => data.id === id);

  return found;
};

// Can check if cart is empty
export const checkCartEmpty = (cart: ICart[]) => {
  return !cart.length;
};

// Can list all items in cart
export const listCart = (cart: ICart[]) => {
  return cart;
};

// Can count number of unique items in cart
export const CountCart = (cart: ICart[]) => {
  return uniq(cart).length;
};

// Can return the total amount of items in cart
export const totalCart = (cart: ICart[]) => {
  return cart.length;
};

import { findIndex } from 'lodash';

export interface ICart {
  id: string;

  quantity: number;
}

let cart: ICart[] = [];

export const createCart = () => {
  cart = [];
};

export const addCart = (productId: string) => {
  cart.push({ id: productId, quantity: 1 });
};

export const updateCart = (productId: string, quantity: number) => {
  const index = findIndex(cart, { id: productId });

  cart.splice(index, 1, { id: productId, quantity });
};

export const removeProduct = (productId: string) => {
  const index = findIndex(cart, { id: productId });

  cart.splice(index, 1);
};

export const emptyCart = () => {
  cart = [];
};


export const name = 'Modivo'


import { toaster } from "@/components/ui/toaster";

export const addItemToShoppingCart = (cartItem = {}, shoppingCartItems = []) => {
  // Check if the same product with the same size already exists
  const existsItem = shoppingCartItems.find(
    item => item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
  );

  if (existsItem) {
    toaster.create({
      title: "Added to your cart",
      description: "This item already exists, quantity increased",
      type: 'success'
    });

    return shoppingCartItems.map(item =>
      item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
        ? { ...item, quantity: item.quantity + cartItem.quantity }
        : item
    );
  }

  // New item (different size or completely new)
  toaster.create({
    title: "Added to your cart",
    type: 'success'
  });

  return [...shoppingCartItems, { ...cartItem }];
};

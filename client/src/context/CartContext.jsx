import * as React from "react";
import { getProductData } from "../data/productList";

export const CartContext = React.createContext({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  getProductQuantity: () => {},
  getTotalCost: () => {},
});

const CartProvider = ({ children }) => {
  const [items, setItems] = React.useState([]);

  function getProductQuantity(id) {
    const quantity = items.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  const addToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setItems([...items, { id, quantity: 1 }]);
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const deleteFromCart = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalCost = () => {
    let totalCost = 0;

    items?.forEach((item) => {
      const productData = getProductData(item.id);
      totalCost += productData.price * item.quantity;
    });

    return totalCost;
  };

  const contextValue = {
    items,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getProductQuantity,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => React.useContext(CartContext);

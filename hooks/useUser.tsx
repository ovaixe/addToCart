import { createContext, useContext, useEffect, useState } from "react";

import { Product, CartItem, Cart } from "@/types";

type UserContextType = {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  placeOrder: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const [cart, setCart] = useState<Cart>({ subTotal: 0, products: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev: Cart) => {
      let updatedCart = { ...prev };
      updatedCart = {
        subTotal: updatedCart.subTotal + product.price,
        products: [...updatedCart.products, { item: product, quantity: 1 }],
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev: Cart) => {
      let updatedCart = { ...prev };

      const updatedProducts = updatedCart.products.filter(
        (product) => product.item.id !== productId
      );

      updatedCart = {
        subTotal: getSubTotal(updatedProducts),
        products: updatedProducts,
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev: Cart) => {
      let updatedCart = { ...prev };

      const updatedProducts = updatedCart.products.map((product) => {
        if (product.item.id === productId) {
          return {
            ...product,
            quantity,
          };
        }
        return product;
      });

      updatedCart = {
        subTotal: getSubTotal(updatedProducts),
        products: updatedProducts,
      };

      return updatedCart;
    });
  };

  const placeOrder = () => {
    setCart({ subTotal: 0, products: [] });
    localStorage.removeItem("cart");
  };

  const getSubTotal = (products: CartItem[]): number => {
    return products.reduce((acc, product) => {
      return acc + product.item.price * product.quantity;
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    placeOrder,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};

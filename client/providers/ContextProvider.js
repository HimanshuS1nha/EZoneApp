import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const Context = createContext(null);

export const getContext = () => {
  const context = useContext(Context);
  return context;
};

const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = async (product) => {
    const newFavourites = [...favourites, product];
    setFavourites(newFavourites);
    await SecureStore.setItemAsync("favourites", JSON.stringify(newFavourites));
  };

  const removeFromFavourites = async (product) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite._id !== product._id
    );
    setFavourites(newFavourites);
    await SecureStore.setItemAsync("favourites", JSON.stringify(newFavourites));
  };

  const getFavourites = async () => {
    const storedFavourites = await SecureStore.getItemAsync("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  };

  const addToCart = async (item) => {
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (itemInCart) {
      alterQuantity(item, "+");
    } else {
      const newCart = [...cart, { ...item, quantity: 1 }];
      setCart(newCart);
    }
  };

  const alterQuantity = async (item, type) => {
    const newCart = cart.filter((cartItem, i) => {
      if (cartItem._id === item._id) {
        if (type === "+") {
          cartItem.quantity += 1;
        } else {
          if (cartItem.quantity === 1) {
            return false;
          }
          cartItem.quantity -= 1;
        }
      }
      return true;
    });
    setCart(newCart);
  };

  const removeFromCart = async (item) => {
    const newCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(newCart);
  };

  const updateTotal = () => {
    const newTotalAmount = cart.reduce((accumulator, cartItem) => {
      return (accumulator += cartItem.price * cartItem.quantity);
    }, 0);
    setTotalAmount(newTotalAmount);
  };

  const getUser = async () => {
    const storedUser = await SecureStore.getItemAsync("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    updateTotal();
  }, [cart, updateTotal]);

  useEffect(() => {
    Promise.allSettled([getUser(), getFavourites()]);
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        product,
        setProduct,
        cart,
        setCart,
        addToCart,
        alterQuantity,
        removeFromCart,
        totalAmount,
        checkoutDetails,
        setCheckoutDetails,
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

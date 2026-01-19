import { createContext, useEffect, useReducer, useState } from "react";
import assets from "../assets/assets";
import useToggle from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  // Fetch products data
  const { 
    data: products, 
    loading: productsLoading, 
    error: productsError 
  } = useFetch("http://localhost:3000/products");

  // Fetch user orders data
  const { 
    data: userOrders, 
    loading: ordersLoading, 
    error: ordersError 
  } = useFetch("http://localhost:3000/userOrders");

  const [openImages, setOpenImages] = useToggle();
  const [productImages, setProductImages] = useState([]);

  const capitalizeWord = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // ------------------- CART REDUCER -------------------

  const cart_intialState = {
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
  };

  function cart_reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART": {
        const { id, size, quantity } = action.payload;

        // Check if same product + same size exists
        const existingItem = state.cartProducts.find(
          (item) => item.id === id && item.size === size
        );

        if (existingItem) {
          // Same product + same size → increase quantity
          return {
            ...state,
            cartProducts: state.cartProducts.map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        } else {
          // New entry → add size only if it exists
          const newItem = { id, quantity };
          if (size) newItem.size = size; // only include size if product has it

          return {
            ...state,
            cartProducts: [...state.cartProducts, newItem],
          };
        }
      }

      case "INCREASE_QUANTITY":
        return {
          ...state,
          cartProducts: state.cartProducts.map((item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.quantity < 20
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };

      case "DECREASE_QUANTITY":
        return {
          ...state,
          cartProducts: state.cartProducts.map((item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };

      case "DELETE_CART_PRODUCT": {
        const { id, size } = action.payload;

        return {
          ...state,
          cartProducts: state.cartProducts.filter((item) => {
            // Agar size wala product hai (shirt etc.)
            if (size) {
              return !(item.id === id && item.size === size);
            }
            // Agar size nahi hai (watch etc.)
            return item.id !== id;
          }),
        };
      }

      default:
        return state;
    }
  }

  const [cart_state, cart_dispatch] = useReducer(
    cart_reducer,
    cart_intialState
  );

  useEffect(() => {
    localStorage.setItem(
      "cartProducts",
      JSON.stringify(cart_state.cartProducts)
    );
  }, [cart_state.cartProducts]);

  const totalCartProduct = () =>
    cart_state.cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  // ------------------- WISHLIST -------------------

  const [wishListProduct, setWishListProduct] = useState(() => {
    const saved = localStorage.getItem("wishlistProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWisList = (productId) => {
    setWishListProduct((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    localStorage.setItem("wishlistProducts", JSON.stringify(wishListProduct));
  }, [wishListProduct]);

  const deleteWishListProduct = (id) => {
    setWishListProduct((prev) => prev.filter((pid) => pid !== id));
  };

  // ------------------- FILTER REDUCER -------------------

  const initialFilterState = {
    gender: [],
    brands: [],
    price: [5, 50000],
    discount: [],
    rating: [],
    tags: [],
  };

  function filterReducer(state, action) {
    switch (action.type) {
      case "TOGGLE_GENDER":
        return {
          ...state,
          gender: state.gender.includes(action.payload)
            ? state.gender.filter((g) => g !== action.payload)
            : [...state.gender, action.payload],
        };

      case "TOGGLE_BRAND":
        return {
          ...state,
          brands: state.brands.includes(action.payload)
            ? state.brands.filter((b) => b !== action.payload)
            : [...state.brands, action.payload],
        };

      case "SET_PRICE":
        return { ...state, price: [state.price[0], action.payload] };

      case "TOGGLE_DISCOUNT":
        return {
          ...state,
          discount: state.discount.includes(action.payload)
            ? state.discount.filter((d) => d !== action.payload)
            : [...state.discount, action.payload],
        };

      case "TOGGLE_RATING":
        return {
          ...state,
          rating: state.rating.includes(action.payload)
            ? state.rating.filter((r) => r !== action.payload)
            : [...state.rating, action.payload],
        };

      case "TOGGLE_TAG":
        return {
          ...state,
          tags: state.tags.includes(action.payload)
            ? state.tags.filter((t) => t !== action.payload)
            : [...state.tags, action.payload],
        };

      default:
        return state;
    }
  }

  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  // ------------------- GLOBAL -------------------

  const currency = "$";
  const navigate = useNavigate();
  const deliveryFee = 5;

  const calculatePrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
    return Math.round(finalPrice); // round off
  };


  const value = {
    // products 
    products,
    productsLoading,
    productsError,

    // user orders
    userOrders,
    ordersLoading,
    ordersError,
    
    assets,
    currency,
    navigate,

    capitalizeWord,

    openImages,
    setOpenImages,
    productImages,
    setProductImages,

    // CART
    cartProducts: cart_state.cartProducts,
    cart_dispatch,
    totalCartProduct,

    // WISHLIST
    wishListProduct,
    toggleWisList,
    deleteWishListProduct,

    // FILTER
    filters,
    dispatch,

    deliveryFee,
    calculatePrice
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;

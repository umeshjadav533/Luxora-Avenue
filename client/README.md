# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


import { createContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import useToggle from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  // fetch product
  const { data: products, loading, error } = useFetch("http://localhost:3000/products");

  const [cartProducts, setCartProducts] = useState(() => {
    const saved = localStorage.getItem('cartProducts');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishListProduct, setWishListProduct] = useState(() => {
    const saved = localStorage.getItem('wishlistProducts');
    return saved ? JSON.parse(saved) : [];
  });

  const [openImages, setOpenImages] = useToggle();
  const [productImages, setProductImages] = useState([]);

  const calculatePrice = (originalPrice, discountPercentage) => {
    return Math.trunc(
      originalPrice - (originalPrice * discountPercentage) / 100
    )
  }
  
  // -------------------
  // Cart Functions
  // -------------------
  const addToCart = (...args) => {
    let productId, productSize, productQuantity;

    // Determine arguments
    if (args.length === 2) {
      productId = args[0];
      productQuantity = args[1];
      productSize = null;
    } else if (args.length === 3) {
      productId = args[0];
      productSize = args[1] ?? null; // ensure null if undefined
      productQuantity = args[2];
    }

    const existProduct = cartProducts.find((item) => item.id === productId);

    if (existProduct) {
      const updatedCart = cartProducts.map((item) => {
        if (item.id === productId) {
          // if product has size
          if (productSize) {
            const sizesArray = Array.isArray(item.sizes) ? item.sizes : [];
            const sizeExists = sizesArray.includes(productSize);
            return {
              ...item,
              sizes: sizeExists ? sizesArray : [...sizesArray, productSize],
              quantity: item.quantity + productQuantity,
            };
          }

          // product has no size
          return {
            ...item,
            quantity: item.quantity + productQuantity,
          };
        }
        return item;
      });

      setCartProducts(updatedCart);
    } else {
      // add new product
      const newItem = {
        id: productId,
        quantity: productQuantity,
      };

      if (productSize) {
        newItem.sizes = [productSize];
      }

      setCartProducts([...cartProducts, newItem]);
    }
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  },[cartProducts]);

  // helper to calculate total quantity
  const totalCartProduct = () => {
    return cartProducts.reduce((acc, item) => acc + item.quantity, 0);
  };


  // -------------------
  // Wishlist Functions
  // -------------------
  const addwishList = (productId) => {
    if (wishListProduct.includes(productId)) {
      return setWishListProduct(
        wishListProduct.filter((id) => id !== productId)
      );
    } else {
      return setWishListProduct([...wishListProduct, productId]);
    }
  };

  useEffect(() => {
    localStorage.setItem('wishlistProducts', JSON.stringify(wishListProduct));
  },[wishListProduct]);

  // captalize method
  const capitalizeWord = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // cart function
  const increaseQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < 20
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteCartProduct = (id) => {
    setCartProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteSize = (id, productSize) => {
    const updateCart = cartProducts.map((item) => {
      if(item.id !== id) return item;
      const filteredSizes = item.sizes.filter(size => size !== productSize);
      return { ...item, sizes: filteredSizes };
    });
    setCartProducts(updateCart);
  }

  const deleteWishListProduct = (id) => {
    setWishListProduct(wishListProduct.filter((productId) => productId !== id));
  }

  const currency = "$";
  const navigate = useNavigate();
  const deliveryFee = 5;
  const value = {
    products,
    loading,
    error,
    assets,
    currency,
    navigate,
    addToCart,
    addwishList,
    totalCartProduct,
    capitalizeWord,
    openImages,
    setOpenImages,
    productImages,
    setProductImages,
    cartProducts,
    setCartProducts,
    increaseQty,
    decreaseQty,
    deleteCartProduct,
    deliveryFee,
    wishListProduct, setWishListProduct,
    deleteWishListProduct,
    calculatePrice,
    deleteSize,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;

//     if (existProduct) {
//       const updatedCart = cartProducts.map((item) => {
//         if (item.id !== productId) return item;

//         const sizeExists = item.sizes.includes(productSize);

//         return {
//           ...item,
//           sizes: sizeExists ? item.sizes : [...item.sizes, productSize],
//           quantity: item.quantity + productQuantity,
//         };
//       });

//       setCartProducts(updatedCart);
//     } else {
//       setCartProducts([
//         ...cartProducts,
//         {
//           id: productId,
//           sizes: [productSize], // array
//           quantity: productQuantity,
//         },
//       ]);
//     }
//   };

// import { createContext, useState } from "react";
// import products from "../assets/dummyProduct";
// import assets from '../assets/assets'
// import useToggle from "../hooks/useToggle";

// export const StoreContext = createContext();

// const StoreContextProvider = ({children}) => {

//     const [cartProduct, setCartProduct ] = useState([]);
//     const [openImages, setOpenImages] = useToggle();
//     const [productImages, setProductImages] = useState([]);
//     const [wishListProduct, setWishListProduct] = useState([]);

//     const addToCart = (productId, productSize, productQuantity) => {
//         const itemSize = new Set();
//         const existProduct = cartProduct.find((productItem) => productItem.id === productId);
//         if(existProduct){
//             const updateCart = cartProduct.map(item => {
//                 if(item.id === productId){
//                     const sizedAlreadyExist = item.sizes.has(productSize);
//                     if(sizedAlreadyExist){
//                         return {
//                             ...item,
//                             quantity: item.quantity + productQuantity
//                         }
//                     }else{
//                         return {
//                             ...item,
//                             sizes: new Set([...item.sizes, productSize]),
//                             quantity: item.quantity + productQuantity
//                         }
//                     }
//                 }else{
//                     return item;
//                 }
//             })
//             setCartProduct(updateCart);
//         }else{
//             setCartProduct([...cartProduct, {
//                 id: productId,
//                 sizes: itemSize.add(productSize),
//                 quantity: productQuantity
//             }]);
//         }
//     }
//     // console.log(cartProduct);

//     const addwishListProduct = (productId) => {
//         if(wishListProduct.includes(productId)){
//             return setWishListProduct(
//                 wishListProduct.filter(id => id !== productId)
//             );
//         }else{
//             return setWishListProduct([...wishListProduct, productId]);
//         }
//     }
//     // console.log(wishListProduct);

//     const totalCartProduct = () => {
//         if(cartProduct.length > 0){
//             const total = cartProduct.reduce((acc, curr) => {
//                 return acc + curr.quantity;
//             },0);
//             return total;
//         }
//     }

//     // captalize method
//     const capitalizeWord = (str) => {
//         return str.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
//     }

//     const currency = '$';
//     const value = {
//         products, assets, currency, addToCart, addwishListProduct, totalCartProduct, capitalizeWord, openImages, setOpenImages, productImages, setProductImages
//     }

//     return (
//         <StoreContext.Provider value={value}>
//             {children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;

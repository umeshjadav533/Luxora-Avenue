import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import CartProduct from "../components/CartProduct";
import NothingHere from "../components/NothingHere";

const CartPage = () => {
  const {
    cart_dispatch,
    currency,
    products,
    cartProducts,
    deliveryFee,
  } = useContext(StoreContext);

  // Map cart items to product details
  const productDetail = cartProducts.map((cartItem) => {
    const filteredProduct = products.find((p) => p.id === cartItem.id);

    if (!filteredProduct) return null; // safety check

    return {
      ...filteredProduct,
      size: cartItem.size,       // fixed: single size
      quantity: cartItem.quantity,
    };
  }).filter(Boolean); // remove nulls

  // Calculate subtotal
  const subTotal = () => {
    return productDetail.reduce((acc, item) => {
      const salePrice = Math.trunc(
        item.originalPrice - (item.originalPrice * item.discountPercentage) / 100
      );
      return acc + salePrice * item.quantity;
    }, 0);
  };

  return (
    <div className={`${cartProducts.length > 0 ? 'mt-[100px]' : 'mt-0'} flex justify-between p-6 gap-6`}>
      
      {/* LEFT: CART ITEMS */}
      {cartProducts.length > 0 && (
        <div className="w-[70%] flex flex-col gap-5">
          {productDetail.map((product) => (
            <CartProduct 
              product={product} 
              key={`${product.id}-${product.size}`} // unique key
            />
          ))}
        </div>
      )}

      {/* RIGHT: ORDER SUMMARY */}
      {cartProducts.length > 0 && (
        <div className="w-[30%] bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-[120px] border border-gray-100">
          <h2 className="text-xl font-bold mb-5 tracking-wide">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-black">{currency}{subTotal()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="font-medium text-green-600">
                {subTotal() > deliveryFee ? "FREE" : `${currency}${deliveryFee}`}
              </span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed"></div>

          <div className="flex justify-between items-center text-lg font-bold mb-4">
            <span>Total</span>
            <span>
              {currency}{subTotal() > deliveryFee ? subTotal() : subTotal() + deliveryFee}
            </span>
          </div>

          <button className="w-full mt-3 bg-black text-white py-3 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-900 transition-all duration-200 active:scale-95">
            Place Order
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout • Free returns within 7 days
          </p>
        </div>
      )}

      {/* EMPTY CART */}
      {cartProducts.length === 0 && (
        <div className="w-full">
          <div className="flex-row-center-property overflow-hidden h-screen">
            <NothingHere 
              title1="YOUR CART IS EMPTY" 
              title2="START SHOPPING!" 
              rootUrl="http://localhost:5173/" 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;

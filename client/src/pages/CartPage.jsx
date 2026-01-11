import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import NothingHere from "../components/NothingHere";

const CartPage = () => {
  const {
    currency,
    products,
    cartProducts,
    deliveryFee
  } = useContext(StoreContext);

  const productDetail = cartProducts.map((cartItem) => {
    const filteredProduct = products.find((p) => p.id === cartItem.id);
    return {
      ...filteredProduct,
      sizes: cartItem.sizes,
      quantity: cartItem.quantity,
    };
  });
  console.log(productDetail);
  const subTotal = () => {
    return productDetail.reduce((acc, item) => {
      const salePrice = Math.trunc(
        item.originalPrice -
        (item.originalPrice * item.discountPercentage) / 100
      );
      return acc + salePrice * item.quantity;
    }, 0);
  };

  return (
    <div className='mt-[100px] flex justify-between p-6 gap-6'>
      {/* LEFT: CART ITEMS */}
      {cartProducts.length > 0 && (
        <div className="w-[70%] flex flex-col gap-5">
          {productDetail.map((product) => (
            <CartProduct product={product} />
          ))}
        </div>
      )}

      {/* RIGHT: Total of product */}
      {cartProducts.length > 0 && (
        <div className="w-[30%] bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-[120px] border border-gray-100">
          <h2 className="text-xl font-bold mb-5 tracking-wide">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-black">
                {currency}{subTotal()}
              </span>
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
              {currency}
              {subTotal() > deliveryFee ? subTotal() : subTotal() + deliveryFee}
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


      {cartProducts.length === 0 && (
        <div className="w-full grid grid-cols-4 gap-5 h-[calc(100vh-140px)]">
          <div className="col-span-1 border overflow-hidden"></div>
          <div className="col-span-3 border flex-row-center-property overflow-hidden">
            <NothingHere title1="YOUR CART IS EMPTY" title2="START SHOPPING!"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

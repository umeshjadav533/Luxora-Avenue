import { Eye } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { StoreContext } from "../Context/StoreContext";
import Price from "./Price";

const WishListProduct = ({ product }) => {
  const {
    setProductImages,
    setOpenImages,
    openImages,
    capitalizeWord,
    cart_dispatch,
    deleteWishListProduct,
  } = useContext(StoreContext);

  return (
    <div
      key={product.id}
      className="bg-white rounded-xl grid grid-cols-4 gap-4 p-4 h-[220px] transition">
      {/* IMAGE */}
      <div className="col-span-1 relative rounded-lg flex items-center justify-center overflow-hidden">
        <Link
          to={`/product/${product.id}`}
          className="h-full w-full flex items-center justify-center">
          <img src={product.images[0]} alt="" className="h-full object-contain" />
        </Link>

        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-0 px-2 py-1 text-xs bg-black text-white rounded-r-full">
            {product.discountPercentage}% OFF
          </span>
        )}

        <span
          className="absolute top-3 right-2 cursor-pointer"
          onClick={() => {
            setProductImages(product.images);
            setOpenImages(!openImages);
          }}
        >
          <Eye size={25} />
        </span>
      </div>

      {/* CONTENT */}
      <ul className="col-span-3 flex flex-col justify-between py-1">
        <li className="text-xl font-bold">{capitalizeWord(product.brand)}</li>
        <li className="text-slate-600 text-sm">{capitalizeWord(product.title)}</li>
        <li className="flex">
          <Rating rating={product.rating} />
        </li>
        <li>
          <Price
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
          />
        </li>
        {product.stock && (
          <li className="text-sm">
            <span className="font-semibold">In Stock:</span> {product.stock}
          </li>
        )}

        {/* BUTTONS */}
        <li className="flex gap-3 pt-2">
          <button
            className="bg-black rounded-md text-white text-xs px-4 py-2 hover:opacity-90"
            onClick={() => {
              cart_dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: product.id,
                  size: product.size ?? null,
                  quantity: 1,   // must be key-value
                },
              });
            }}
          >
            ADD TO BAG
          </button>

          <button
            onClick={() => deleteWishListProduct(product.id)}
            className="bg-red-700 py-2 px-4 rounded-md text-white text-xs hover:bg-red-800"
          >
            REMOVE
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WishListProduct;

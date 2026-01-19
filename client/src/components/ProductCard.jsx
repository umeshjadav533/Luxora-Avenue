import { Link } from "react-router-dom";
import  { useContext } from "react";
import Rating from "./Rating";
import { Eye, ShoppingBag } from "lucide-react";
import LikedButton from "./LikedButton";
import { StoreContext } from "../Context/StoreContext";
import Price from "./Price";

const ProductCard = ({ productItemData }) => {
  const { cart_dispatch, capitalizeWord, openImages, setOpenImages, setProductImages
  } = useContext(StoreContext);

  return (
    <div className="h-[400px] bg-white border border-[#e6e1d8] rounded-xl  group p-3 flex flex-col gap-2">

      {/* Image Section */}
      <ul className="h-[220px] relative overflow-hidden flex items-center justify-center bg-white overflow-hidden">
        <li className="w-full h-full flex-row-center-property bg-[#F9FAFB] rounded-lg">
          <Link to={`/product/${productItemData.id}`}>
            <img
              src={productItemData.images[0]}
              className="h-[200px] object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg" />
          </Link>
        </li>

        <li className="absolute top-3 right-3">
          <LikedButton id={productItemData.id} />
          <div
            className="hover:scale-110 transition cursor-pointer"
            onClick={() => {
              setProductImages(productItemData.images);
              setOpenImages(!openImages);
            }}>
            <Eye size={25} />
          </div>
        </li>

        <li className="absolute bottom-1 left-2">
          <Rating rating={productItemData.rating} />
        </li>

        {/* Discount Badge */}
        {productItemData.discountPercentage > 0 && (
          <li className="absolute top-5 left-0 bg-black text-white px-3 py-1 text-xs rounded-r-lg tracking-wide">
            {productItemData.discountPercentage}% OFF
          </li>
        )}
      </ul>

      {/* -----------------------------Info Section--------------------------- */}
      <ul className="h-[180px] flex flex-col justify-between">
        <li className="font-semibold text-[15px] truncate">
          {capitalizeWord(productItemData.title)}
        </li>

        {/* best seller Badge */}
        <li className="flex gap-2">
          {productItemData.bestSeller && (
            <span className="relative bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase before:content-['★'] before:mr-1">
              Best Seller
            </span>
          )}

          {productItemData.newArrival && (
            <span className="relative bg-white text-black border border-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
              New In
            </span>
          )}
        </li>

        <li className="text-gray-500 text-sm truncate-description">
          {capitalizeWord(productItemData.description)}
        </li>

        {/* price */}
        <li>
          <Price originalPrice={productItemData.originalPrice} discountPercentage={productItemData.discountPercentage} />
        </li>

        {/* add to cart button */}
        <li>
          <button
          className="bg-black text-white text-xs font-semibold w-full rounded-lg py-2 flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition cursor-pointer"
          onClick={()=>{
            if(productItemData.sizes?.length){
              cart_dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: productItemData.id,
                  size: productItemData.sizes[0],
                  quantity: 1
                }
              });
            } else {
              cart_dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: productItemData.id,
                  size: null,
                  quantity: 1
                }
              });
            }
          }}
          >
          <ShoppingBag size={16} />
          ADD TO BAG
        </button>
        </li>
      </ul>
    </div>

  );
};

export default ProductCard;
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
    <div className="h-[500px] bg-white border border-[#e6e1d8] rounded-2xl hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300 group">

      {/* Image Section */}
      <ul className="h-[250px] relative overflow-hidden flex items-center justify-center bg-white rounded-t-2xl border-b-3 border-[#ECE9E2]">
        <li className="w-full h-full flex-row-center-property bg-[#ffffff]">
          <Link to={`/product/${productItemData.id}`}>
            <img
              src={productItemData.images[0]}
              className="h-[240px] object-contain transition-transform duration-300 group-hover:scale-110" />
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

        {/* Discount Badge */}
        {productItemData.discountPercentage > 0 && (
          <li className="absolute top-5 left-0 bg-black text-white px-3 py-1 text-xs rounded-r-lg tracking-wide">
            {productItemData.discountPercentage}% OFF
          </li>
        )}
      </ul>

      {/* Info Section */}
      <ul className="h-[250px] p-4 flex flex-col justify-between">
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

        <li className="flex justify-between">
          <Rating rating={productItemData.rating} />
        </li>

        <li>
          <Price originalPrice={productItemData.originalPrice} discountPercentage={productItemData.discountPercentage} />
        </li>

        {/* CTA */}
        <button
          className="bg-black text-white text-sm font-semibold w-full rounded-lg py-2 flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition cursor-pointer"
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
      </ul>
    </div>

  );
};

export default ProductCard;
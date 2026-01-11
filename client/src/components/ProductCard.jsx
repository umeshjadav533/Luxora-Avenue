// import { Link } from "react-router-dom";
// import React, { useContext } from "react";
// import Rating from "./Rating";
// import Color from "./Color";
// import Price from "./Price";
// import { Eye, ShoppingBag } from "lucide-react";
// import LikedButton from "./LikedButton";
// import { StoreContext } from "../Context/StoreContext";

// const ProductCard = ({ productItemData }) => {
//   const {
//     addToCart,
//     capitalizeWord,
//     openImages,
//     setOpenImages,
//     setProductImages,
//   } = useContext(StoreContext);

//   return (
//     <div className="h-[450px] bg-white border border-[#e6e1d8]  rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]  hover:-translate-y-1 transition-all duration-300">
//       <ul className="h-[250px] relative overflow-hidden flex-row-center-property bg-[#f7f5f0] border-b border-[#eee6db]">
//         <li>
//           <Link to={`/product/${productItemData.id}`}>
//             <img
//               src={productItemData.images[0]}
//               className="h-[250px] object-contain transition-transform duration-300 ease-out hover:scale-110"
//             />
//           </Link>
//         </li>
//         <li className="absolute top-3 right-3 bg-white flex-row-center-property p-1 rounded-full shadow-md hover:shadow-lg transition cursor-pointer">
//           <LikedButton id={productItemData.id} />
//         </li>

//         <li
//           className="absolute top-13 right-3 bg-white flex-row-center-property p-1 rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
//           onClick={() => {
//             setProductImages(productItemData.images);
//             setOpenImages(!openImages);
//           }}>
//           <Eye />
//         </li>

//         {productItemData.discountPercentage > 0 && (
//           <li className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-xs  rounded-lg">
//             {productItemData.discountPercentage} %OFF
//           </li>
//         )}
//       </ul>
//       <ul className="h-[200px] px-2 py-1 flex flex-col justify-between">
//         {productItemData.title && (
//           <li className="font-bold text-lg truncate-title">
//             {capitalizeWord(productItemData.title)}
//           </li>
//         )}
//         {productItemData.description && (
//           <li className="text-slate-500 truncate-description text-sm">
//             {capitalizeWord(productItemData.description)}
//           </li>
//         )}
//         {productItemData.rating && (
//           <li className="flex">
//             <Rating rating={productItemData.rating} />
//           </li>
//         )}
//         <li className="flex justify-between ">
//           {productItemData.colors && (
//             <Color
//               colors={productItemData.colors}
//               colorWidth={20}
//               colorHeight={20}
//               outlineOffset={2}
//               colorLength={true}
//             />
//           )}
//           {productItemData.originalPrice && (
//             <Price
//               originalPrice={productItemData.originalPrice}
//               discountPercentage={productItemData.discountPercentage}/>
//           )}
//         </li>
//         <li className="my-2">
//           <button
//             className="bg-[#000] text-white font-semibold w-full rounded-lg py-2  flex-row-center-property gap-2 shadow-[0_4px_10px_rgba(253,199,0,0.35)] hover:brightness-95 transition cursor-pointer hover:opacity-80"
//             onClick={() =>
//               productItemData.sizes?.length
//                 ? addToCart(productItemData.id, productItemData.sizes[0], 1)
//                 : addToCart(productItemData.id, 1)
//             }>
//             <span>                                                                          
//               <ShoppingBag />
//             </span>
//             <small>ADD TO BAG</small>
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ProductCard;


import { Link } from "react-router-dom";
import  { useContext } from "react";
import Rating from "./Rating";
import { Eye, ShoppingBag } from "lucide-react";
import LikedButton from "./LikedButton";
import { StoreContext } from "../Context/StoreContext";
import Price from "./Price";

const ProductCard = ({ productItemData }) => {
  const { addToCart, capitalizeWord, openImages, setOpenImages, setProductImages, calculatePrice, currency
  } = useContext(StoreContext);

  return (
    <div className="h-[460px] bg-white border border-[#e6e1d8] rounded-2xl hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300 group">

      {/* Image Section */}
      <ul className="h-[260px] relative overflow-hidden flex items-center justify-center bg-white rounded-t-2xl border-b-3 border-[#ECE9E2]">
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
      <ul className="h-[200px] p-4 flex flex-col justify-between">
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
          <Price originalPrice={productItemData.originalPrice} discountPercentage={productItemData.discountPercentage} />
        </li>

        {/* CTA */}
        <button
          className="bg-black text-white text-sm font-semibold w-full rounded-lg py-2 flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition cursor-pointer"
          onClick={() => productItemData.sizes?.length
            ? addToCart(productItemData.id, productItemData.sizes[0], 1)
            : addToCart(productItemData.id, 1)
          }>
          <ShoppingBag size={16} />
          ADD TO BAG
        </button>
      </ul>
    </div>

  );
};

export default ProductCard;


// import { useContext, useEffect, useState } from 'react'
// import Slider from './Slider'
// import { StoreContext } from '../Context/StoreContext';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
// import Rating from './Rating';
// import LikedButton from './LikedButton';
// import Price from './Price';

// const HotDeals = () => {
//   const { products, openImages, setOpenImages, setProductImages, currency, calculatePrice } = useContext(StoreContext);
//   const [hotDealsData, setHotDealsData] = useState([]);

//   useEffect(() => {
//     const filterData = products.filter((item) => item.discountPercentage > 40);
//     setHotDealsData(filterData);
//   }, [products]);

//   return (
//     <div className='w-full px-5 my-10 flex flex-col justify-between'>
//       <h1 className='text-5xl font-bold roker-font text-end my-5'>HOT DEALS</h1>
//       <Slider
//         data={hotDealsData}
//         superLargeDesktop={6}
//         desktop={5}
//         tablet={4}
//         mobile={3}
//         itemClass='p-3'
//         sliderPerMove={3}
//         leftArrowClass='absolute top-1/2 -translate-y-1/2 left-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property'
//         rightArrowClass='absolute top-1/2 -translate-y-1/2 right-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property'
//         renderItem={(item) => (
//           <div
//             key={item.id}
//             className="h-[360px] relative overflow-hidden bg-[#F9FAFB] rounded-xl shadow-md hover:shadow-xl transition group">
//             <Link to={`/product/${item.id}`}>
//               <img
//                 src={item.thumbnail}
//                 alt={item.title}
//                 className="h-[220px] w-full object-contain transition-transform duration-300 group-hover:scale-110" />
//             </Link>

//             {/* Discount Badge */}
//             <span className="absolute top-5 left-0 bg-black text-white text-xs px-2 py-1 rounded-r-lg">
//               {item.discountPercentage}% OFF
//             </span>

//             {/* Action Icons */}
//             <div className="absolute top-3 right-3 flex flex-col gap-2">
//               <LikedButton id={item.id} />
//               <div
//                 className="hover:scale-110 transition cursor-pointer"
//                 onClick={() => {
//                   setProductImages(item.images);
//                   setOpenImages(!openImages);
//                 }}
//               >
//                 <Eye size={25} />
//               </div>
//             </div>

//             {/* Bottom Info */}
//             <div className="absolute bottom-0 w-full bg-white p-3 border-t">
//               <p className="font-semibold text-sm truncate">{item.title}</p>

//               <div className="flex items-center gap-2 mt-1">
//                 <Rating rating={item.rating} bgcolor="transparent" />
//                 <span className="text-xs text-gray-500">({item.stock}+)</span>
//               </div>

//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-lg">
//                   {currency}
//                   {calculatePrice(item.originalPrice, item.discountPercentage)}
//                 </span>
//                 <span className="line-through text-sm text-gray-400">
//                   {currency}{item.originalPrice}
//                 </span>
//               </div>
//             </div>
//           </div>

//         )}
//       />
//     </div>
//   )
// }

// export default HotDeals

import { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingBag } from "lucide-react";
import Rating from "./Rating";
import LikedButton from "./LikedButton";
import Price from "./Price";

const HotDeals = () => {
  const {
    products,
    openImages,
    setOpenImages,
    setProductImages,
    cart_dispatch
  } = useContext(StoreContext);
  const [hotDealsData, setHotDealsData] = useState([]);

  useEffect(() => {
    const filterData = products.filter((item) => item.discountPercentage > 40);
    setHotDealsData(filterData);
  }, [products]);

  return (
    <div className="w-full px-5 my-10 flex flex-col justify-between">
      <h1 className="text-5xl font-bold roker-font text-end my-5">HOT DEALS</h1>
      <Slider
        data={hotDealsData}
        superLargeDesktop={6}
        desktop={5}
        tablet={4}
        mobile={3}
        itemClass="p-3"
        sliderPerMove={3}
        leftArrowClass="absolute top-1/2 -translate-y-1/2 left-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property"
        rightArrowClass="absolute top-1/2 -translate-y-1/2 right-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property"
        renderItem={(item) => (
          <div
            key={item.id}
            className="h-full bg-white rounded-xl border border-[#e6e1d8] group p-2 flex flex-col gap-2">
            <Link to={`/product/${item.id}`} className="relative block">
              {/* Image */}
              <div className="bg-[#F9FAFB] h-[220px] flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Discount Badge */}
              <span className="absolute top-3 left-0 bg-black text-white text-[11px] px-3 py-1 rounded-r-full shadow-md">
                {item.discountPercentage}% OFF
              </span>

              {/* Action Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <LikedButton id={item.id} />
                <div
                  className="hover:scale-110 transition cursor-pointer"
                  onClick={() => {
                    setProductImages(item.images);
                    setOpenImages(!openImages);
                  }}>
                  <Eye size={25} />
                </div>
              </div>

              {/* Rating */}
              <div className="absolute bottom-1 left-2">
                <Rating rating={item.rating} />
              </div>
            </Link>

            {/* ---------------------Bottom Info------------------- */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 truncate-description">
                {item.title}
              </h3>

              <div className="flex justify-between items-center gap-2">
                <Price
                  originalPrice={item.originalPrice}
                  discountPercentage={item.discountPercentage}
                />
                <button className="bg-black text-white p-2 rounded-md flex items-center gap-2 text-xs" 
                onClick={() => {
                  if(item.sizes?.length){
                    cart_dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id: item.id,
                        size: item.sizes[0],
                        quantity: 1
                      }
                    })
                  } else {
                    cart_dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id: item.id,
                        size: null,
                        quantity: 1
                      }
                    })
                  }
                }}>
                  <ShoppingBag size={18}/>
                  {/* <span>ADD TO CART</span> */}
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default HotDeals;

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


import { useContext, useEffect, useState } from 'react'
import Slider from './Slider'
import { StoreContext } from '../Context/StoreContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import Rating from './Rating';
import LikedButton from './LikedButton';
import Price from './Price';

const HotDeals = () => {
  const { products, openImages, setOpenImages, setProductImages, currency, calculatePrice } = useContext(StoreContext);
  const [hotDealsData, setHotDealsData] = useState([]);

  useEffect(() => {
    const filterData = products.filter((item) => item.discountPercentage > 40);
    setHotDealsData(filterData);
  }, [products]);

  return (
    <div className='w-full px-5 my-10 flex flex-col justify-between'>
      <h1 className='text-5xl font-bold roker-font text-end my-5'>HOT DEALS</h1>
      <Slider
        data={hotDealsData}
        superLargeDesktop={6}
        desktop={5}
        tablet={4}
        mobile={3}
        itemClass='p-3'
        sliderPerMove={3}
        leftArrowClass='absolute top-1/2 -translate-y-1/2 left-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property'
        rightArrowClass='absolute top-1/2 -translate-y-1/2 right-2 bg-black text-white z-50 rounded-lg p-1 cursor-pointer flex-row-center-property'
        renderItem={(item) => (
          <div
            key={item.id}
            className="h-[370px] relative overflow-hidden bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-300 group">
            <Link to={`/product/${item.id}`}>
              <div className="bg-[#ffffff] h-[230px] flex items-center justify-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-[210px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Discount Badge */}
            <span className="absolute top-3 left-3 bg-black text-white text-[11px] px-2 py-1 rounded-full shadow">
              {item.discountPercentage}% OFF
            </span>

            {/* Action Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 justify-center items-center">
              <div className='flex-row-center-property'>
                <LikedButton id={item.id} />
              </div>
              <div
                className="p-2 rounded-full hover:scale-105 transition cursor-pointer"
                onClick={() => {
                  setProductImages(item.images);
                  setOpenImages(!openImages);
                }}
              >
                <Eye size={25} />
              </div>
            </div>

            {/* Bottom Info */}
            <ul className="p-4 border-t-3 border-[#ECE9E2]">
              <li className="font-semibold text-sm truncate">{item.title}</li>

              <li className="flex items-center gap-2 mt-1">
                <Rating rating={item.rating} bgcolor="transparent" />
                <span className="text-xs text-gray-500">({item.stock}+)</span>
              </li>

              <li className="flex items-end gap-2 mt-2">
                <Price originalPrice={item.originalPrice} discountPercentage={item.discountPercentage}/>
              </li>
            </ul>
          </div>
        )}
      />
    </div>
  )
}

export default HotDeals

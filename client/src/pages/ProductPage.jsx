// const { productId } = useParams();
//   const {  products, capitalizeWord, setProductImages, setOpenImages, openImages, addToCart
//   } = useContext(StoreContext);

//   const [productData, setProductData] = useState(null);
//   const [itemSize, setItemSize] = useState("");
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);

//   // Find Product
//   useEffect(async() => {
//     if(products.length > 0){
//       const findedProduct = await products.find(p => p.id === String(productId));
//       setProductData(findedProduct);

//       // set default size
//       if(productData?.sizes?.length > 0){
//         setItemSize(productData.sizes[0]);
//       }

//       // Related products
//       if(productData){
//         const filteredRelatedProducts = products.filter(
//           p => p.category === productData.category && p.id !== productData.id
//         );
//         setRelatedProducts(filteredRelatedProducts);
//       }
//     }
//   },[products, productId]);

//   if(!productData) return <div className="h-screen flex-col-center-property">
//     <span className="text-5xl roker-font text-red-400">Loading...</span>
//   </div>

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import Slider from '../components/Slider';
import Rating from '../components/Rating';
import Price from '../components/Price';
import Color from '../components/Color';
import { HandCoins, Minus, Plus, RefreshCcw, ShieldCheck, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  const { productId } = useParams();
  const { products, capitalizeWord, setProductImages, setOpenImages, openImages, addToCart
  } = useContext(StoreContext);

  const [productData, setProductData] = useState(null);
  const [itemSize, setItemSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Find product safely
  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => String(p.id) === String(productId));
      setProductData(found);
    }
  }, [products, productId]);

  useEffect(() => {
    // set default size
    if (productData?.sizes?.length > 0) {
      setItemSize(productData.sizes[0]);
    }
  }, [productData])

  // Related products
  useEffect(() => {
    if (productData) {
      const filteredRelatedProducts = products.filter(
        p => p.category === productData.category && p.id !== productData.id
      );
      setRelatedProducts(filteredRelatedProducts);
    }
  }, [products, productData])

  if (!productData) return <div className="h-screen flex-col-center-property">
    <span className="text-5xl roker-font text-red-400">Loading...</span>
  </div>
  return (
    <div className='w-full mt-[120px] p-5'>
      {productData.images.length > 1 ? (
        <Slider
          data={productData.images}
          superLargeDesktop={3}
          desktop={3}
          tablet={3}
          mobile={3}
          sliderPerMove={1}
          showDots={true}
          loop={true}
          buttonText={false}
          leftArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
          rightArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
          renderItem={(item) => (
            <div className="flex-row-center-property my-5">
              <img src={item} className="h-[350px]" />
            </div>
          )}
        />
      ) : (
        <div className="flex-row-center-property my-5">
          <img src={productData.images[0]} className="h-[350px]" />
        </div>
      )}

      <div className='w-full p-10 bg-white mx-auto my-5 rounded-xl grid grid-cols-4 gap-2'>
        <ul className='flex flex-col gap-2 p-5'>
          {/* brand name */}
          <li>
            {productData.brand && (
              <h3 className="text-2xl font-bold">
                {capitalizeWord(productData.brand)}
              </h3>
            )}
          </li>

          {/* product title */}
          <li>
            {productData.title && (
              <span className="text-xl">{capitalizeWord(productData.title)}</span>
            )}
          </li>

          {/* product description  */}
          <li>
            {productData.description && (
              <small className="text-justify">
                {capitalizeWord(productData.description)}
              </small>
            )}
          </li>

          <li className="flex-row-between-property">
            {/* product rating */}
            {productData.rating && <Rating rating={productData.rating} />}

            {/* product discount */}
            {productData.discountPercentage &&
              productData.discountPercentage > 0 && (
                <span className="bg-black text-white px-4 py-1 rounded-md">
                  {productData.discountPercentage} % OFF
                </span>
              )}
          </li>

          {/* product price */}
          <li>
            <Price
              originalPrice={productData.originalPrice}
              discountPercentage={productData.discountPercentage}
            />
          </li>
        </ul>


        <ul className='flex flex-col gap-5 p-5'>
          <li>
            {/* product colors */}
            {productData.colors && (
              <>
                <span>COLORS</span>
                <span>
                  <Color
                    colors={productData.colors}
                    colorWidth={30}
                    colorHeight={30}
                    outlineOffset={3}
                  />
                </span>
              </>
            )}
          </li>

          <li>
            <h3 className="font-bold text-md">Quantity</h3>
            <div className="flex gap-2">
              <ul className="bg-white border border-slate-400 flex-row-center-property gap-5 rounded-lg font-bold select-none">
                <li
                  className="p-1 px-2 cursor-pointer h-full rounded-l-lg flex-row-center-property"
                  onClick={() => setQuantity(q => (q > 1 ? q - 1 : q))}>
                  <Minus size={15} />
                </li>
                <li className="p-1 text-sm w-[20px] flex-row-center-property">
                  {quantity}
                </li>
                <li
                  className="p-1 px-2 cursor-pointer h-full rounded-r-lg flex-row-center-property"
                  onClick={() => setQuantity(q => (q < 20 ? q + 1 : q))}>
                  <Plus size={15} />
                </li>
              </ul>
            </div>
          </li>
        </ul>


        <ul className='flex flex-col gap-5 p-5'>

          <li className="flex gap-2">
            {productData.bestSeller && (
              <span className="relative bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase before:content-['★'] before:mr-1">
                Best Seller
              </span>
            )}

            {productData.newArrival && (
              <span className="relative bg-white text-black border border-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                New In
              </span>
            )}
          </li>

          <li className="flex flex-col gap-3">
            {/* product sizes */}
            {productData.sizes?.length > 0 && (
              <>
                <span>SIZES</span>
                <div className="grid grid-cols-4 gap-6">
                  {productData.sizes.map((size) => (
                    <span
                      className={`border border-gray-400 rounded-md hover:bg-black text-center py-2 hover:text-white cursor-pointer ${size === itemSize ? "bg-black text-white" : ""}`}
                      onClick={() => setItemSize(size)}>
                      {size}
                    </span>
                  ))}
                </div>
              </>
            )}
          </li>

        </ul>


        <ul className='flex-col-center-property gap-5 p-5'>
          <li className='w-full flex flex-col gap-2'>
            {/* add to cart button */}
            <button
              className="bg-[#000] text-white font-semibold w-full rounded-full py-2  flex-row-center-property gap-2 shadow-[0_4px_10px_rgba(253,199,0,0.35)] transition cursor-pointer hover:opacity-80"
              onClick={() => addToCart(productData.id, itemSize, quantity)}>
              <span>
                <ShoppingBag />
              </span>
              <small>ADD TO BAG</small>
            </button>

            {/* buy now button */}
            <button className="bg-[#000] text-white font-semibold w-full rounded-full py-2 shadow-[0_4px_10px_rgba(253,199,0,0.35)] transition cursor-pointer hover:opacity-80">
              <small>BUY NOW</small>
            </button>
          </li>

        </ul>
      </div>

      <ul className="w-full m-auto my-8 rounded-2xl bg-white grid grid-cols-1 md:grid-cols-3 gap-6 p-6 font-semibold">

        {/* Warranty */}
        <li className="group flex flex-col items-center gap-3 border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow-lg transition">
          <ShieldCheck size={42} className="text-green-600 group-hover:scale-110 transition" />
          <span className="text-gray-800 text-center">
            {productData.warrantyInformation ? productData.warrantyInformation : "No Warranty"}
          </span>
        </li>

        {/* Return Policy */}
        <li className="group flex flex-col items-center gap-3 border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow-lg transition">
          <RefreshCcw size={42} className="text-blue-600 group-hover:rotate-180 transition" />
          <span className="text-gray-800 text-center">
            {productData.returnPolicy ? productData.returnPolicy : "Not Returnable"}
          </span>
        </li>

        {/* COD */}
        <li className="group flex flex-col items-center gap-3 border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow-lg transition">
          <HandCoins size={42} className="text-yellow-600 group-hover:scale-110 transition" />
          <span className="text-gray-800 text-center">
            {productData.isCODAvailable ? "Cash On Delivery" : "COD Not Available"}
          </span>
        </li>

      </ul>


      <div className="w-full m-auto mt-10 mb-0">
        <h3 className="roker-font my-5 text-4xl">EXPLORE</h3>
        <div className="grid grid-cols-5 gap-2">
          {relatedProducts.map((item) => (
            <ProductCard productItemData={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage

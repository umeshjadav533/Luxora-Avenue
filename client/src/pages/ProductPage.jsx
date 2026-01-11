import { useContext, useEffect, useState } from "react";
import Slider from "../components/Slider";
import { StoreContext } from "../Context/StoreContext";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Price from "../components/Price";
import Color from "../components/Color";
import {Eye, HandCoins, Minus, Plus, RefreshCcw, ShieldCheck, ShoppingBag} from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { productId } = useParams();
  const {
    products,
    capitalizeWord,
    setProductImages,
    setOpenImages,
    openImages,
    addToCart,
  } = useContext(StoreContext);
  const productData = products.find((item) => item.id === Number(productId));
  const [itemSize, setItemSize] = useState(
    productData.sizes && productData.sizes.length > 0 ? productData.sizes[0] : []
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const filteredData = products.filter(
      (product) => product.category === productData.category
    );
    setRelatedProducts(filteredData);
  }, [products]);

  const increaseQty = () => {
    setQuantity(prev => prev < 20 ? prev + 1 : prev);
  }

  const decreaseQty = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : prev);
  }

  return (
    <div className="w-full mt-[80px]">
      <div className="">
        <Slider
          data={productData.images}
          superLargeDesktop={3}
          desktop={3}
          tablet={3}
          mobile={3}
          sliderPerMove={1}
          showDots={true}
          loop={true}
          leftArrowClass="border hover:bg-black hover:text-white transition-color duration-300 absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full cursor-pointer"
          rightArrowClass="border hover:bg-black hover:text-white transition-color duration-300  absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full cursor-pointer"
          renderItem={(item) => (
            <div className="flex-row-center-property my-5">
              <img src={item} className="h-[350px]" />
            </div>
          )}
        />
        <div
          className="absolute top-30 right-10 bg-white flex-row-center-property p-1 rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={() => {
            setProductImages(productData.images);
            setOpenImages(!openImages);
          }}
        >
          <Eye size={40}/>
        </div>
      </div>

      <div className="bg-white w-[95%] m-auto rounded-xl grid grid-cols-4 gap-2 my-5 p-10">
        <div className="flex flex-col gap-2 p-5">
          {/* brand name */}
          {productData.brand && (
            <h3 className="text-2xl font-bold">
              {capitalizeWord(productData.brand)}
            </h3>
          )}

          {/* product title */}
          {productData.title && (
            <span className="text-xl">{capitalizeWord(productData.title)}</span>
          )}

          {/* product description  */}
          {productData.description && (
            <small className="text-justify">
              {capitalizeWord(productData.description)}
            </small>
          )}

          <span className="flex-row-between-property">
            {/* product rating */}
            {productData.rating && <Rating rating={productData.rating} />}

            {/* product discount */}
            {productData.discountPercentage &&
              productData.discountPercentage > 0 && (
                <span className="bg-black text-white px-4 py-1 rounded-md">
                  {productData.discountPercentage} % OFF
                </span>
              )}
          </span>

          {/* product price */}
          <span>
            <Price
              originalPrice={productData.originalPrice}
              discountPercentage={productData.discountPercentage}
            />
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3">
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

          <h3 className="font-bold text-md">Quantity</h3>
          <div className="flex gap-2">
            <div className="bg-white border border-slate-400 flex-row-center-property gap-5 rounded-lg font-bold select-none">
              <span
                className="p-1 px-2 cursor-pointer h-full rounded-l-lg flex-row-center-property"
                onClick={decreaseQty}>
                <Minus size={15} />
              </span>
              <span className="p-1 text-sm w-[20px] flex-row-center-property">
                {quantity}
              </span>
              <span
                className="p-1 px-2 cursor-pointer h-full rounded-r-lg flex-row-center-property"
                onClick={increaseQty}>
                <Plus size={15} />
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {/* product sizes */}
          {productData.sizes?.length > 0 && (
            <>
              <span>SIZES</span>
              <div className="grid grid-cols-4 gap-6">
                {productData.sizes.map((size) => (
                  <span
                    className={`border border-gray-400 rounded-md hover:bg-black text-center py-2 hover:text-white cursor-pointer ${
                      size === itemSize ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setItemSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-5 flex-col-center-property gap-5">
          {/* add to cart button */}
          <button
            className="bg-[#000] text-white font-semibold w-full rounded-full py-2  flex-row-center-property gap-2 shadow-[0_4px_10px_rgba(253,199,0,0.35)] transition cursor-pointer hover:opacity-80"
            onClick={() => addToCart(productData.id, itemSize, quantity)}
          >
            <span>
              <ShoppingBag />
            </span>
            <small>ADD TO BAG</small>
          </button>

          {/* buy now button */}
          <button className="bg-[#000] text-white font-semibold w-full rounded-full py-2 shadow-[0_4px_10px_rgba(253,199,0,0.35)] transition cursor-pointer hover:opacity-80">
            <small>BUY NOW</small>
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="w-[95%] m-auto my-5 rounded-xl bg-white flex justify-around p-5 font-bold">
        {/* product warrenty */}
        {productData.warrantyInformation && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <ShieldCheck size={40} />
            <span>{productData.warrantyInformation}</span>
          </div>
        )}

        {!productData.warrantyInformation && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <ShieldCheck size={40} />
            <span>No Warranty</span>
          </div>
        )}

        {/* product return policy */}
        {productData.isReturnable && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <RefreshCcw size={40} />
            <span>{productData.returnPolicy}</span>
          </div>
        )}

        {!productData.isReturnable && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <RefreshCcw size={40} />
            <span>Not Returnable</span>
          </div>
        )}

        {/* product cash on delivery */}
        {productData.isCODAvailable && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <HandCoins size={40} />
            <span>Cash On Delivery</span>
          </div>
        )}

        {!productData.isCODAvailable && (
          <div className="flex-col-center-property border-2 border-slate-400 rounded-xl px-15 py-3 bg-gray-200">
            <HandCoins size={40} />
            <span>COD Not Available</span>
          </div>
        )}
        {/*  */}
      </div>

      <div className="w-[95%] m-auto my-5">
        <h3 className="roker-font my-5">EXPLORE</h3>
        <div className="grid grid-cols-5 gap-2">
          {relatedProducts.map((item) => (
            <ProductCard productItemData={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="w-[95%] m-auto my-5 rounded-xl"></div>
    </div>
  );
};

export default ProductPage;
// { data, renderItem, superLargeDesktop = 5, desktop = 4, tablet = 2, mobile = 1, sliderPerMove = 3, showDots=false, outSideDots=false, loop=false, leftArrowClass, rightArrowClass, itemClass='' }

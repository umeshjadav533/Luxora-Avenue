import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import Price from "./Price";

const ShopByCategory = () => {
  const { products, capitalizeWord } = useContext(StoreContext);
  const [shopByCategory, setShopByCategory] = useState([]);

  useEffect(() => {
    const subCategoryMap = new Map();
    products.forEach((product) => {
      const { id, title, images, discountPercentage, subCategory } = product;
      if(subCategory && !subCategoryMap.has(subCategory)){
        subCategoryMap.set(subCategory, {
          id,
          title,
          image: images?.[0],
          discountPercentage,
          subCategory
        });
      }
    });
    setShopByCategory(Array.from(subCategoryMap.values()));
  },[products]);
  console.log(shopByCategory);
  return (
    <div className="w-full my-10 px-6">
      <h3 className="text-5xl roker-font text-gray-800 mb-6">SHOP BY CATEGORY</h3>

      <div className="grid grid-cols-6 gap-6">
        {shopByCategory.map((item) => (
          <div
            key={item.id}
            className="h-[240px] relative overflow-hidden rounded-2xl group bg-white border border-[#d6d1c4] shadow-md hover:shadow-xl transition">
            <Link to={`/category/${item.category}`} className="flex flex-col h-full">

              {/* Image */}
              <img
                src={item.image}
                className="w-full h-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Info - Bottom Se Chipka Hua */}
              <div className="mt-auto p-3 text-center bg-[#000]">
                <h4 className="text-lg font-bold text-gray-800 tracking-wide text-white">
                  {capitalizeWord(item.subCategory)}
                </h4>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                flex items-center justify-center transition">
                <span className="border-2 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-[#000] transition duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;

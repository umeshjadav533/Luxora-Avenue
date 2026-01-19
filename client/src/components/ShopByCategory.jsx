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
  return (
    <div className="w-full my-10 px-6">
      <h3 className="text-5xl roker-font text-gray-800 mb-6">SHOP BY CATEGORY</h3>

      <div className="grid grid-cols-4 gap-2">
        {shopByCategory.map((item) => (
          <div
            key={item.id}
            className="h-[420px] relative overflow-hidden flex-col-center-property rounded-2xl group border border-[#d6d1c4] shadow-md hover:shadow-xl transition bg-white transition-all duration-700 hover:rounded-[250px]">
            <Link to={`/category/${item.category}`} className="flex flex-col w-full h-full flex-col-center-property">
              {/* Image */}
              <img
                src={item.image}
                className="w-full h-full object-contain"
              />

              {/* Hover Overlay */}
              <div className="absolute 
                flex items-center justify-center">
                <span className="border-2 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-[#fff] hover:text-black hover:border-white transition duration-300">
                  Shop Now &nbsp; →
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
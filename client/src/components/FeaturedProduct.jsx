import React, { useContext, useEffect, useState } from "react";
import CustomCarousel from "./CustomCarousel";
import { StoreContext } from "../Context/StoreContext";

const FeaturedProduct = () => {
  const { products } = useContext(StoreContext);
  const [featureditem, setFeatureditem] = useState([]);

  useEffect(() => {
    const filterditem = products.filter((item) => item.isFeatured);
    setFeatureditem(filterditem);
  }, [products]);

  return (
    <>
      <CustomCarousel
        title="FEATURED"
        data={featureditem}
        interval={4000}
        renderItem={(item) => <FeaturedSlide item={item} />}
      />
    </>
  );
};

const FeaturedSlide = ({ item }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="w-full h-[500px] flex bg-[#F9FAFB] overflow-hidden my-5">
      {/* Main Image */}
      <div className="w-1/2 h-full flex items-center justify-center">
        {item.images.length > 0 && (
          <img
            src={item.images?.[imageIndex]}
            className="w-full h-[400px] object-contain"
            alt={item.title}
          />
        )}
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex">
        {/* Thumbnails */}
        {item.images.length > 0 && (
          <div
            className={`w-2/5 h-full grid grid-cols-2 gap-2 p-2 ${item.images.length > 4 ? "grid-rows-4" : ""
              }`}>
            {item.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImageIndex(index)}
                className={`w-full h-full object-contain border rounded-md cursor-pointer ${imageIndex === index ? "border-black" : "border-gray-300"
                  }`}/>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="w-3/5 flex flex-col gap-2 p-5">
          {item.brand && (
            <p className="text-xl font-bold">Brand :- {item.brand}</p>
          )}
          {item.category && (
            <p className="font-bold text-xl uppercase">{item.category}</p>
          )}
          {item.title && (
            <p className="capitalize">{item.title}</p>
          )}
          {item.description && (
            <small className="capitalize text-justify">{item.description}</small>
          )}

          <div className="grid grid-cols-2 gap-2">
            {item.weight && (
              <p>Weight: {item.weight}</p>
            )}
            {item.dimensions.width && (
              <p>Width: {item.dimensions.width}</p>
            )}
            {item.dimensions.height && (
              <p>Height: {item.dimensions.height}</p>
            )}
            {item.dimensions.depth && (
              <p>Depth: {item.dimensions.depth}</p>
            )}
          </div>

          {item.launchDate && (
            <p className="font-bold text-lg">
              Launch date: {item.launchDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

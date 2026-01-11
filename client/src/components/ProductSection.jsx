import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../components/ProductCard";
import Slider from "./Slider";

const ProductSection = ({ title, filterFn }) => {
  const { products } = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filtered = filterFn(products);
    setData(filtered);
  }, [products, filterFn]);

  if (!data.length) return null; // agar data empty ho to kuch render na ho

  return (
    <div className="w-full my-10 flex flex-col justify-between px-3">
      <h1 className="text-5xl font-bold roker-font text-center my-5">
        {title}
      </h1>

      <Slider
        data={data}
        superLargeDesktop={6}
        desktop={5}
        tablet={4}
        mobile={3}
        sliderPerMove={3}
        itemClass="px-2 py-2"
        leftArrowClass="w-[40px] h-[120px] absolute top-1/2 -translate-y-1/2 left-2 flex-row-center-property bg-black text-white rounded-r-lg cursor-pointer"
        rightArrowClass="w-[40px] h-[120px] absolute top-1/2 -translate-y-1/2 right-2 flex-row-center-property bg-black text-white rounded-l-lg cursor-pointer"
        renderItem={(item) => (
          <ProductCard key={item.id} productItemData={item} />
        )}
      />
    </div>
  );
};

export default ProductSection;

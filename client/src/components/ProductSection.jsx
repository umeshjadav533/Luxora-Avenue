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
      <h1 className="text-5xl font-extrabold roker-font text-center mb-5 text-green-400 underline decoration-black underline-offset-15">
        {title}
      </h1>

      <Slider
        data={data}
        superLargeDesktop={6}
        desktop={5}
        tablet={4}
        mobile={3}
        sliderPerMove={3}
        buttonText={false}
        itemClass="px-1 py-2"
        leftArrowClass="bg-black absolute top-1/2 -translate-y-1/2 left-3 text-white p-2 rounded-lg"
        rightArrowClass="bg-black absolute top-1/2 -translate-y-1/2 right-3 text-white p-2 rounded-lg"
        renderItem={(item) => (
          <ProductCard key={item.id} productItemData={item} />
        )}
      />
    </div>
  );
};

export default ProductSection;

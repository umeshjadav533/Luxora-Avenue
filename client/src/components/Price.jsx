import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Price = ({ originalPrice, discountPercentage }) => {
  const { currency, calculatePrice } = useContext(StoreContext);
  return (
    <div className="flex gap-2 items-end">
      <span className="text-lg text-red-500 font-bold">
        {currency}{calculatePrice(originalPrice, discountPercentage)}
      </span>
      <span className="line-through text-sm text-gray-400">
        {currency}{originalPrice}
      </span>
    </div>
  );
};

export default Price;
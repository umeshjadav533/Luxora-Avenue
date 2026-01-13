import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Eye, Minus, Plus, X } from "lucide-react";
import { StoreContext } from "../Context/StoreContext";
import Price from "./Price";

const CartProduct = ({ product }) => {
    const {
        setProductImages,
        setOpenImages,
        openImages,
        deleteCartProduct,
        capitalizeWord,
        decreaseQty,
        increaseQty,
        deleteSize
    } = useContext(StoreContext);

    return (
        <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex overflow-hidden">
            {/* IMAGE */}
            <div className="w-[180px] relative bg-[#f7f7f7] flex items-center justify-center">
                {product.images && (
                    <Link to={`/product/${product.id}`}>
                        <img
                            src={product.images[0]}
                            className="h-[200px] object-contain p-4"
                        />
                    </Link>
                )}

                {product.discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                        {product.discountPercentage}% OFF
                    </span>
                )}

                <span
                    className="absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full shadow"
                    onClick={() => {
                        setProductImages(product.images);
                        setOpenImages(!openImages);
                    }}>
                    <Eye size={16} />
                </span>
            </div>

            {/* DETAILS */}
            <div className="flex-1 p-4 relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => deleteCartProduct(product.id)}>
                    <X size={18} />
                </button>

                {product.brand && (
                    <h2 className="text-lg font-semibold">
                        {capitalizeWord(product.brand)}
                    </h2>
                )}

                {product.title && (
                    <p className="text-gray-500 text-sm">
                        {capitalizeWord(product.title)}
                    </p>
                )}

                {/* SIZE */}
                {product.sizes?.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">Size:</span>
                        {product.sizes.map((size) => {
                            return (
                                <div className="flex-row-center-property gap-5 border border-slate-500 p-[2px] rounded-lg bg-[#F9FAFB]">
                                    <span
                                        key={size}
                                        className="bg-black text-white px-2 py-0.5 text-sm rounded-md">
                                        {size}
                                    </span>
                                    {product.sizes.length > 1 && (
                                        <button
                                            className="hover:text-slate-500 cursor-pointer"
                                            onClick={() => deleteSize(product.id, size)}>
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* PRICE */}
                {product.originalPrice && (
                    <div className="mt-2 text-sm flex items-center gap-2">
                        <span className="text-gray-500">Price:</span>
                        <Price
                            originalPrice={product.originalPrice}
                            discountPercentage={product.discountPercentage}
                        />
                    </div>
                )}

                {/* QUANTITY */}
                <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs text-gray-500">Qty:</span>
                    <div className="flex items-center border rounded-full overflow-hidden">
                        <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => decreaseQty(product.id)}>
                            <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">
                            {product.quantity}
                        </span>
                        <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => increaseQty(product.id)}>
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;

import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import NothingHere from "../components/NothingHere";
import WishListProduct from "../components/WishListProduct";

const WishListPage = () => {
  const { products, wishListProduct } = useContext(StoreContext);

  const productDetail = wishListProduct
    .map((wishListItemId) => {
      return products.find((p) => {
        return p.id === wishListItemId;
      });
    })
    .filter((item) => {
      return item;
    });

  return (
    <div className="mt-[100px] grid grid-cols-4 px-5 gap-5">
      <div className="col-span-1 overflow-hidden h-[calc(100vh-140px)]"></div>
      {productDetail.length > 0 && (
        <div className="col-span-3 rounded-xl p-5 flex flex-col gap-5">
          {productDetail.map((product) => (
            <WishListProduct product={product} />
          ))}
        </div>
      )}

      {productDetail.length === 0 && (
        <div className="w-full col-span-3 gap-5 h-[calc(100vh-140px)]">
          <div className="col-span-3 flex-row-center-property overflow-hidden">
            <NothingHere title1="NO ITEM IN WISHLIST" title2="START SHOPPING!" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
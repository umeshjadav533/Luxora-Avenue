import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import NothingHere from "../components/NothingHere";
import WishListProduct from "../components/WishListProduct";

const WishListPage = () => {
  const { products, wishListProduct, assets } = useContext(StoreContext);

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
    <div className="mt-[100px] grid grid-cols-4 px-5 gap-5 my-5">
      <div className="col-span-1 overflow-hidden rounded-xl p-2">
        {assets.wishListPageOfferImages.map((images) => (
          <div
            key={images.link}
            className="flex-col-center-property overflow-hidden m-2">
            <a href={images.link}>
              <img
                src={images.image}
                className={`${images.image[0].image ? "rounded-t-xl" : ""}`}
              />
            </a>
          </div>
        ))}
      </div>
  
      {productDetail.length > 0 && (
        <div className="col-span-3 rounded-xl p-5 flex flex-col gap-5">
          {productDetail.map((product) => (
            <WishListProduct product={product} key={product.id} />
          ))}
        </div>
      )}

      {productDetail.length === 0 && (
        <div className="w-full col-span-3 gap-5 h-full flex-col-center-property">
          <div className="col-span-3 flex-row-center-property overflow-hidden">
            <NothingHere
              title1="NO ITEM IN WISHLIST"
              title2="START SHOPPING!"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
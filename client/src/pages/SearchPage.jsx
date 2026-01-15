import { useSearchParams } from "react-router-dom";
import { useContext, useMemo, useReducer, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Star } from "lucide-react";

// -------------------- COMPONENT --------------------
function SearchPage() {
  const {
    products,
    currency,
    brandSearch,
    setBrandSearch,
    filters,
    dispatch,
    filteredBrandList,
  } = useContext(StoreContext);
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  // Search + Filter (useMemo)
  const searchedProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [products, query]);

  console.log(filters);

const finalFilteredProducts = useMemo(() => {
  return searchedProducts.filter((product) => {

    // GENDER
    if (filters.gender.length &&
        !filters.gender.includes(product.gender.toUpperCase())) {
      return false;
    }

    // BRAND
    if (filters.brands.length &&
        !filters.brands.includes(product.brand.toUpperCase())) {
      return false;
    }

    // PRICE (salePrice use karo)
    if (
      filters.price.length &&
      (product.salePrice < filters.price[0] ||
       product.salePrice > filters.price[1])
    ) {
      return false;
    }

    // DISCOUNT (discountPercentage use karo)
    if (
      filters.discount.length &&
      !filters.discount.some(d => product.discountPercentage >= d)
    ) {
      return false;
    }

    // RATING
    if (
      filters.rating.length &&
      !filters.rating.some(r => product.rating >= r)
    ) {
      return false;
    }

    // TAGS (lowercase match)
    if(filters.tags.length){
      const tagMatch = filters.tags.some((t) => {
        if (t === "BEST SELLER") return product.bestSeller === true;
        if (t === "NEW ARRIVAL") return product.newArrival === true;
        return false;
      });
      if (!tagMatch) return false;
    }
    return true;
  });
}, [searchedProducts, filters]);


  const totalPages = Math.ceil(finalFilteredProducts.length / itemsPerPage);

  const displayedProducts = finalFilteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  console.log(finalFilteredProducts);
  return (
    <>
      <div className="mt-[80px] grid grid-cols-4 gap-5 p-5">
        {/* FILTERS */}
        <ul className="col-span-1 bg-white p-5">
          {/* GENDER */}
          <li className="border-b p-4">
            <h3 className="font-bold">GENDER</h3>
            {["MEN", "WOMEN", "KIDS"].map((g) => (
              <label key={g} className="flex gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_GENDER", payload: g })
                  }
                />
                {g}
              </label>
            ))}
          </li>

          {/* BRANDS */}
          <li className="border-b p-4">
            <h3 className="font-bold">BRANDS</h3>
            <input
              className="border p-1 w-full my-2"
              placeholder="Search brand"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
            {filteredBrandList.slice(0, 8).map((b) => (
              <label key={b} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_BRAND", payload: b })
                  }
                />
                {b}
              </label>
            ))}
          </li>

          {/* PRICE */}
          <li className="border-b p-4">
            <h3 className="font-bold">PRICE</h3>
            <p>
              {currency}
              {filters.price[0]} - {currency}
              {filters.price[1]}
            </p>
            <input
              type="range"
              min={5}
              max={50000}
              value={filters.price[1]}
              onChange={(e) =>
                dispatch({ type: "SET_PRICE", payload: Number(e.target.value) })
              }
              className="w-full rangeSlider"
            />
          </li>

          {/* DISCOUNT */}
          <li className="border-b p-4">
            <h3 className="font-bold">DISCOUNT</h3>
            {[...Array(9)].map((_, i) => {
              const d = (i + 1) * 10;
              return (
                <label key={d} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={filters.discount.includes(d)}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_DISCOUNT", payload: d })
                    }
                  />
                  {d}% OFF OR MORE
                </label>
              );
            })}
          </li>

          {/* RATING */}
          <li className="border-b p-4">
            <h3 className="font-bold">RATING</h3>
            {[2, 3, 4, 5].map((rate) => (
              <label key={rate} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={filters.rating.includes(rate)}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_RATING", payload: rate })
                  }
                />
                {[...Array(rate)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-green-500 text-green-500"
                  />
                ))}
                <span>& Up</span>
              </label>
            ))}
          </li>

          {/* TAGS */}
          <li className="p-4">
            <h3 className="font-bold">TAGS</h3>
            {["BEST SELLER", "NEW ARRIVAL"].map((tag) => (
              <label key={tag} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_TAG", payload: tag })
                  }
                />
                {tag}
              </label>
            ))}
          </li>
        </ul>

        {/* PRODUCTS */}
        <div className="col-span-3 grid grid-cols-4 gap-3">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} productItemData={product} />
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-3 justify-center items-center my-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="border rounded-lg py-1 px-4 disabled:opacity-50 hover:bg-black hover:text-white"
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="border rounded-lg py-1 px-4 disabled:opacity-50 hover:bg-black hover:text-white"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default SearchPage;

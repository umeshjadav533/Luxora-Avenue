import { useSearchParams } from "react-router-dom";
import { useContext, useMemo, useReducer, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Star } from "lucide-react";

// -------------------- REDUCER --------------------
const initialFilterState = {
  gender: [],
  brands: [],
  price: [5, 50000],
  discount: [],
  rating: [],
  tags: [],
};

function filterReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_GENDER":
      return {
        ...state,
        gender: state.gender.includes(action.payload)
          ? state.gender.filter((g) => g !== action.payload)
          : [...state.gender, action.payload],
      };

    case "TOGGLE_BRAND":
      return {
        ...state,
        brands: state.brands.includes(action.payload)
          ? state.brands.filter((b) => b !== action.payload)
          : [...state.brands, action.payload],
      };

    case "SET_PRICE":
      return { ...state, price: [state.price[0], action.payload] };

    case "TOGGLE_DISCOUNT":
      return {
        ...state,
        discount: state.discount.includes(action.payload)
          ? state.discount.filter((d) => d !== action.payload)
          : [...state.discount, action.payload],
      };

    case "TOGGLE_RATING":
      return {
        ...state,
        rating: state.rating.includes(action.payload)
          ? state.rating.filter((r) => r !== action.payload)
          : [...state.rating, action.payload],
      };

    case "TOGGLE_TAG":
      return {
        ...state,
        tags: state.tags.includes(action.payload)
          ? state.tags.filter((t) => t !== action.payload)
          : [...state.tags, action.payload],
      };

    default:
      return state;
  }
}

// -------------------- COMPONENT --------------------
function SearchPage() {
  const { products, currency, capitalizeWord } = useContext(StoreContext);
  const [params] = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
  const [brandSearch, setBrandSearch] = useState("");

  const brands = [
    "Nike","Adidas","Puma","Reebok","Levi's","Zara","H&M",
    "Rare Rabbit","Allen Solly","Peter England","U.S. Polo Assn.",
    "Roadster","HRX","Calvin Klein","Tommy Hilfiger","Louis Philippe",
    "Van Heusen","Wrangler","Pepe Jeans","Flying Machine",
  ];

  // Search + Filter (useMemo)
  const searchedProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [products, query]);

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);
  const displayedProducts = searchedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const filteredBrandList = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  console.log("Filters:", filters);

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
            <p>{currency}{filters.price[0]} - {currency}{filters.price[1]}</p>
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
                  <Star key={i} size={16} className="fill-green-500 text-green-500" />
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
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="border rounded-lg py-1 px-4 disabled:opacity-50 hover:bg-black hover:text-white">
            Prev
          </button>

          <span>{page} / {totalPages}</span>

          <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="border rounded-lg py-1 px-4 disabled:opacity-50 hover:bg-black hover:text-white">
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default SearchPage;


// import { useSearchParams } from "react-router-dom";
// import { useContext, useMemo, useState } from "react";
// import { StoreContext } from "../Context/StoreContext";
// import ProductCard from "../components/ProductCard";
// import { Star } from "lucide-react";

// function SearchPage() {
//   const { products, currency, capitalizeWord } = useContext(StoreContext);
//   const [params] = useSearchParams();
//   const query = params.get("query")?.toLowerCase() || "";
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;
//   const brands = [
//     "Nike",
//     "Adidas",
//     "Puma",
//     "Reebok",
//     "Levi's",
//     "Zara",
//     "H&M",
//     "Rare Rabbit",
//     "Allen Solly",
//     "Peter England",
//     "U.S. Polo Assn.",
//     "Roadster",
//     "HRX",
//     "Calvin Klein",
//     "Tommy Hilfiger",
//     "Louis Philippe",
//     "Van Heusen",
//     "Wrangler",
//     "Pepe Jeans",
//     "Flying Machine",
//   ];
//   const [filterProducts, setFilteredProducts] = useState({
//     gender: [],
//     brands: [],
//     price: [5, 50000],
//     discount: [],
//     rating: [],
//     tags: [],
//   });
//   const [brandSearch, setBrandSearch] = useState("");

//   // 🔥 useMemo instead of useEffect
//   const filteredProductsData = useMemo(() => {
//     return products.filter(
//       (product) =>
//         product.title.toLowerCase().includes(query) ||
//         product.description.toLowerCase().includes(query) ||
//         product.tags.some((tag) => tag.toLowerCase().includes(query))
//     );
//   }, [products, query]);
//   const totalPages = Math.ceil(filteredProductsData.length / itemsPerPage);
//   const displayedProducts = filteredProductsData.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   // gender filter
//   const toggleGender = (e) => {
//     const genderValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       gender: prev.gender.includes(genderValue)
//         ? prev.gender.filter((g) => g !== genderValue)
//         : [...prev.gender, genderValue],
//     }));
//   };

//   // brand filter
//   const filteredBrandList = brands.filter((b) =>
//     b.toLowerCase().includes(brandSearch.toLocaleLowerCase())
//   );

//   const toggleBrand = (e) => {
//     const brandValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       brands: prev.brands.includes(brandValue)
//         ? prev.gender.filter((b) => b !== brandValue)
//         : [...prev.brands, brandValue],
//     }));
//   };

//   // price filter
//   const priceFilter = (e) => {
//     const priceValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       price: [filterProducts.price[0], Number(priceValue)],
//     }));
//   };

//   // discount filter
//   const toggleDiscount = (e) => {
//     const discountValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       discount: prev.discount.includes(discountValue)
//         ? prev.discount.filter((d) => d !== discountValue)
//         : [...prev.discount, discountValue],
//     }));
//   };

//   //rating filter
//   const toggleRating = (e) => {
//     const ratingValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       rating: prev.rating.includes(rate)
//         ? prev.rating.filter((r) => r !== ratingValue)
//         : [...prev.rating, ratingValue],
//     }));
//   };

//   // tags filter
//   const toggleTags = (e) => {
//     const tagValue = e.target.value;
//     setFilteredProducts((prev) => ({
//       ...prev,
//       tags: prev.tags.includes(tagValue)
//         ? prev.tags.filter((t) => t !== tagValue)
//         : [...prev.tags, tagValue],
//     }));
//   }

//   console.log(filterProducts);
//   return (
//     <>
//       <div className="mt-[80px] grid grid-cols-4 gap-5 p-5">
//         {/* filter grid box */}
//         <ul className="col-span-1 bg-white overflow-hidden p-5">
//           {/* gender filter */}
//           <li className="border-b border-slate-400 p-5">
//             <h3 className="text-lg font-bold my-2">GENDER</h3>
//             <ul className="flex flex-col justify-start gap-2 px-3">
//               <li className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   value="MEN"
//                   onChange={(e) => toggleGender(e)}
//                 />
//                 <span>MEN</span>
//               </li>
//               <li className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   value="WOMEN"
//                   onChange={(e) => toggleGender(e)}
//                 />
//                 <span>WOMEN</span>
//               </li>
//               <li className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   value="KIDS"
//                   onChange={(e) => toggleGender(e)}
//                 />
//                 <span>KIDS</span>
//               </li>
//             </ul>
//           </li>

//           {/* brands filter */}
//           <li>
//             <h3 className="text-lg font-bold my-2">BRANDS</h3>
//             <input
//               type="text"
//               className="bg-[#F9FAFB p-2 rounded-lg text-sm border-2 w-full"
//               placeholder="Search Brand name"
//               value={brandSearch}
//               onChange={(e) => setBrandSearch(e.target.value)}
//             />
//             <ul className="flex flex-col gap-2 px-3">
//               {filteredBrandList.slice(0, 10).map((brandName) => (
//                 <li key={brandName} className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value={brandName}
//                     onClick={(e) => toggleBrand(e)}
//                   />
//                   <span>{brandName}</span>
//                 </li>
//               ))}
//             </ul>
//           </li>

//           {/* price filter */}
//           <li className="border-b border-slate-400 p-5">
//             <h3 className="text-lg font-bold my-2">PRICE</h3>
//             <label className="px-3">
//               {currency}
//               {filterProducts.price[0]} - {currency}
//               {filterProducts.price[1]}
//             </label>
//             <input
//               type="range"
//               className="w-full rangeSlider"
//               min={5}
//               max={50000}
//               value={filterProducts.price[1]}
//               onChange={(e) => priceFilter(e)}
//             />
//           </li>

//           {/* discount filter */}
//           <li className="border-b border-slate-400 p-5">
//             <h3 className="text-lg font-bold my-2">DISCOUNT</h3>
//             <ul className="flex flex-col gap-2 px-3">
//               {[...Array(9)].map((_, i) => {
//                 const discount = (i + 1) * 10;
//                 return (
//                   <li key={discount} className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       value={discount}
//                       onChange={(e) => toggleDiscount(e)}
//                     />
//                     <span>{discount}% OFF OR MORE</span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </li>

//           {/* rating filter */}
//           <li className="border-b border-slate-400 p-5">
//             <h3 className="text-lg font-bold my-2">RATING</h3>

//             <ul className="flex flex-col gap-3 px-3">
//               {[2, 3, 4, 5].map((rate) => (
//                 <li
//                   key={rate}
//                   className="flex gap-2 items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     value={rate}
//                     checked={filterProducts.rating.includes(rate)}
//                     onChange={() =>
//                       setFilteredProducts((prev) => ({
//                         ...prev,
//                         rating: prev.rating.includes(rate)
//                           ? prev.rating.filter((r) => r !== rate)
//                           : [...prev.rating, rate],
//                       }))
//                     }
//                   />

//                   <span className="flex gap-1">
//                     {[...Array(rate)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={18}
//                         className="fill-[#00C950] text-[#00C950]"
//                       />
//                     ))}
//                   </span>

//                   <span className="text-sm text-gray-600 ml-1">& Up</span>
//                 </li>
//               ))}
//             </ul>
//           </li>

//           {/* tags filter */}
//           <li className="border-b border-slate-400 p-5">
//             <h3 className="font-bold text-lg my-2">TAGS</h3>
//             <ul className="flex flex-col gap-2 px-3">
//               <li className="flex gap-2 items-center">
//                 <input type="checkbox" value="BEST SELLER" onChange={(e)=>toggleTags(e)}/>
//                 <span>BEST SELLER</span>
//               </li>
//               <li className="flex gap-2 items-center">
//                 <input type="checkbox" value="NEW ARRIVAL" onChange={(e)=>toggleTags(e)} />
//                 <span>NEW ARRIVAL</span>
//               </li>
//             </ul>
//           </li>
//         </ul>

//         {/* product grid box */}
//         <div className="col-span-3 grid grid-cols-4 gap-2 overflow-hidden">
//           {displayedProducts.length > 0 && (
//             <div className="bg-white col-span-4 flex items-center justify-between p-2 rounded-lg text-sm">
//               <div>
//                 <span>
//                   Showing <b>{page}</b> – <b>{itemsPerPage}</b> of{" "}
//                   <b>{totalPages}</b> results
//                 </span>
//                 <span className="text-gray-500">
//                   for "
//                   <span className="font-medium text-black">
//                     {capitalizeWord(query)}
//                   </span>
//                   "
//                 </span>
//               </div>
//             </div>
//           )}

//           {displayedProducts.map((product) => (
//             <ProductCard key={product.id} productItemData={product} />
//           ))}
//         </div>
//       </div>

//       {/* pagination */}
//       {totalPages > 1 && (
//         <div className="flex gap-3 justify-center items-center my-6">
//           <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//             Prev
//           </button>

//           <span>
//             {page} / {totalPages}
//           </span>

//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default SearchPage;
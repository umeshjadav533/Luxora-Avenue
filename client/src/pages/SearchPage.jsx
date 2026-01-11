import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";

function SearchPage() {
    const { products } = useContext(StoreContext);
    const [params] = useSearchParams();
    const query = params.get("q")?.toLowerCase() || "";

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Filter products based on query
        const result = products.filter(
            (product) =>
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.tags.some((tag) => tag.toLowerCase().includes(query))
        );
        setFilteredProducts(result);
        setPage(1); // Reset page on new search
    }, [query]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Results for: {query}</h2>

            {displayedProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {displayedProducts.map((item) => (
                        <div key={item.id} className="border p-2 rounded">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-40 object-cover mb-2"
                            />
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <p className="font-bold">${item.salePrice}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex gap-3 mt-6 justify-center items-center">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span>
                        {page} / {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default SearchPage;

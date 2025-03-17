import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchProducts } from "../slices/productSlice.ts";
import Footer from "../components/footer.tsx";
import Header from "../components/header.tsx";
import { addToCart } from "../slices/cartSlice.ts";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../slices/productDetailSlice.ts";

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.products);

  const [filterValue, setFilterValue] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(items.length / productsPerPage);

  const handleDetails = (id: number) => {
    dispatch(fetchProduct(id as any));
    navigate(`/product/${id}`);
  };

  const currentProducts = useMemo(() => {
    const sortedItems = [...items].sort((a, b) => {
      if (filterValue === "LTH") return a.price - b.price;
      if (filterValue === "HTL") return b.price - a.price;
      return 0; 
    });

    return sortedItems.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [items, filterValue, indexOfFirstProduct, indexOfLastProduct]);

  const applyFilter = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pb-20 flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-white p-4 shadow rounded-lg mb-4 md:mb-0">
          <h2 className="font-semibold mb-4">Categories</h2>
          <ul>
            {["Electronics", "Clothing", "Home & Garden", "Sports", "Books"].map((category) => (
              <li key={category} className="mb-2">
                <input type="checkbox" className="mr-2" /> {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-full md:w-3/4 p-4">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <p>
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, items.length)} of {items.length} products
            </p>
            <div className="flex items-center">
              <p className="pr-2">Sort by:</p>
              <select className="border p-1 rounded" onChange={(e) => applyFilter(e.target.value)}>
                <option value="Featured">Featured</option>
                <option value="LTH">Price: Low to High</option>
                <option value="HTL">Price: High to Low</option>
              </select>
            </div>
          </div>

          {status === "loading" && <p className="text-center">Loading products...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts?.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow rounded-lg">
                <div onClick={() => handleDetails(product.id)}>
                  <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
                  <h3 className="font-semibold mt-2 text-sm md:text-base lg:text-lg truncate w-full">{product.title}</h3>
                  <div className="flex">{renderStars(product.rating.rate)} {`(${product.rating.count})`}</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                      dispatch(addToCart(product as any));
                      e.preventDefault();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {currentProducts.length !== 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListPage;

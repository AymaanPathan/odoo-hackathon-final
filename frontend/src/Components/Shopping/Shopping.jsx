/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedYear, selectedAuthor, selectedGenre, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/all-products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterAndSortProducts = () => {
    let updatedProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedYear ? product.year === parseInt(selectedYear) : true) &&
        (selectedAuthor
          ? product.author.toLowerCase().includes(selectedAuthor.toLowerCase())
          : true) &&
        (selectedGenre
          ? product.genre.toLowerCase().includes(selectedGenre.toLowerCase())
          : true)
    );

    setFilteredProducts(updatedProducts);
  };

  const getUniqueYears = () => {
    const years = products.map((product) => product.year);
    return [...new Set(years)].sort((a, b) => a - b);
  };

  return (
    <div className="mx-auto p-6 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#4A3F35]">
        Explore Our Product Collection
      </h1>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          />
          <input
            type="text"
            placeholder="Author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          />
          <input
            type="text"
            placeholder="Genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          >
            <option value="">All Years</option>
            {getUniqueYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden shadow-md bg-white"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-[#4A3F35]">
                  {product.title}
                </h2>
                <p className="text-[#4A3F35] mb-2">Author: {product.author}</p>
                <p className="text-[#4A3F35] mb-2">
                  Publisher: {product.publisher}
                </p>
                <p className="text-[#4A3F35] mb-2">Year: {product.year}</p>
                <p className="text-[#4A3F35] mb-2">Genre: {product.genre}</p>
                <p className="text-[#4A3F35] mb-2">
                  Quantity: {product.quantity}
                </p>
                <p className="text-[#4A3F35] mb-2">
                  Availability:{" "}
                  {product.availability ? "Available" : "Out of Stock"}
                </p>
                <Link to={`/${product.ItemId}`}>
                  <button className="bg-green-500 hover:brightness-125 duration-100 text-white py-2 px-4 rounded-full mt-4 focus:outline-none">
                    Show Product
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

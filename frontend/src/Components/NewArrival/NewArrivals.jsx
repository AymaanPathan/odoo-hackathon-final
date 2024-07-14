import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/all-products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Filter products from the year 2024
      const filteredProducts = data.products.filter(
        (item) => item.year === 2024
      );
      setNewArrivals(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="new-arrivals-container mt-24 p-8">
      <div className="mb-12 text-center">
        <span className="text-gray-600 text-lg font-bold uppercase tracking-wide">
          New Arrivals
        </span>
        <p className="text-3xl text-[#1B2834] font-semibold mt-2">
          Our Latest Collection of 2024
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {newArrivals.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl max-w-sm"
          >
            <div className="relative">
              <i className="absolute top-4 right-4 text-xl cursor-pointer far fa-heart"></i>
              <p className="absolute top-4 left-4 py-1 px-3 text-sm text-[#38988F] font-semibold bg-white rounded-md shadow-md">
                New
              </p>
              <Link to={`/${item.ItemId}`}>
                <img
                  src={item.image}
                  className="w-full h-48 object-cover"
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-xl text-[#1B2834] font-bold">
                {item.author}
              </p>
              <div className="flex items-center text-sm mt-2 gap-4">
                <p className="text-gray-500 font-bold">{item.publisher}</p>
                <div className="flex items-center gap-1">
                  {/* Placeholder for star rating */}
                  <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
                  <p>4.0</p>
                </div>
              </div>
              <div className="flex items-center mt-2 text-lg font-bold gap-4">
                <p className="text-[#7F493F]">Rs. {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

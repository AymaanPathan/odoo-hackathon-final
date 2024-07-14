import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [items, setItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/all-products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const shuffledProducts = shuffleArray(data.products);
      setItems(shuffledProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <div key={item._id} className="border p-4 rounded-lg shadow-lg">
          <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-700 mb-1">{item.author}</p>
          <p className="text-gray-700 mb-1">{item.publisher}</p>
          <p className="text-gray-700 mb-1">{item.year}</p>
          <p className="text-gray-700 mb-1">${item.price}</p>
          <p className="text-gray-700 mb-1">{item.genre}</p>
          <p className={`text-${item.availability ? "green" : "red"}-600`}>
            {item.availability ? "Available" : "Not Available"}
          </p>
          <Link to={`/${item.ItemId}`}>
            <button className="bg-green-500 hover:brightness-125 duration-100 text-white py-2 px-4 rounded-full mt-4 focus:outline-none">
              Show Product
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Recommended;

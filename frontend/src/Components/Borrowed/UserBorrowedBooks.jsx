/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const UserPurchasedProducts = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-purchased-products/${userId}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchased Products</h1>
      <div className="bg-white shadow-md rounded p-4">
        <ul>
          {products.map((product) => (
            <li key={product._id} className="mb-4 p-4 border rounded shadow-sm">
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-sm">Author: {product.author}</p>
                  <p className="text-sm">Price: ₹{product.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPurchasedProducts;

import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Productcontext } from "../../Context/Product";
import Sidebar from "./Sidebar";
import "./adminPanel.css";

export default function MainContent() {
  const [ItemId, setItemId] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState(2021);
  const [genre, setGenre] = useState("Fiction");
  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(0); // New state variable for price
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("Select image");
  const [availability, setAvailability] = useState(true);

  const { fetchProducts } = useContext(Productcontext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || "Select image");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.image_url);
        console.log("File uploaded:", data);
        alert("File uploaded successfully");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleAddProduct = async () => {
    if (
      !ItemId ||
      ItemId <= 0 ||
      !title ||
      !author ||
      !imageUrl ||
      !publisher ||
      year == null ||
      price <= 0
    ) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/AddProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ItemId: parseInt(ItemId, 10),
          title: title,
          author: author,
          publisher: publisher,
          year: parseInt(year, 10),
          genre: genre,
          quantity: parseInt(quantity, 10),
          price: parseFloat(price), // Include price in the request body
          image: imageUrl,
          availability: Boolean(availability),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${response.statusText}`);
        console.error(`Details: ${errorText}`);
        throw new Error("Failed to add book.");
      }

      const result = await response.json();
      toast.success(`Book ${result.title} added successfully!`);
      fetchProducts(); // Fetch updated list of books
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book.");
    }
  };

  const resetForm = () => {
    setItemId(0);
    setTitle("");
    setAuthor("");
    setPublisher("");
    setYear(2021);
    setGenre("Fiction");
    setQuantity(10);
    setPrice(0); // Reset price
    setFile(null);
    setFileName("Select image");
    setAvailability(true);
    setImageUrl(""); // Reset imageUrl
  };

  useEffect(() => {
    fetchProducts(); // Fetch books when the component mounts
  }, []);

  return (
    <div className="flex mx-auto w-full bg-white rounded-lg shadow-md">
      <Sidebar />

      {/* Form Container */}
      <div className="flex-1 px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="itemId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Item ID
            </label>
            <input
              value={ItemId}
              onChange={(e) => setItemId(e.target.value)}
              type="number"
              id="itemId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter item ID..."
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter book title..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Author
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              id="author"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter author..."
            />
          </div>

          <div>
            <label
              htmlFor="publisher"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Publisher
            </label>
            <input
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              type="text"
              id="publisher"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter publisher..."
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Year
          </label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            id="year"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter year of publication..."
          />
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Genre
          </label>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            type="text"
            id="genre"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter genre..."
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quantity
          </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            id="quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quantity..."
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter price..."
          />
        </div>

        <label
          htmlFor="productImage"
          className="block text-sm font-medium text-gray-700"
        >
          Book Image
        </label>
        <div className="flex h-12 gap-12 items-center">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productImage"
              className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {fileName}
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              id="productImage"
              name="productImage"
              className="hidden"
            />
            <button
              onClick={handleUpload}
              type="button"
              className="bg-indigo-600 py-2 px-6 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload
            </button>
          </div>
        </div>
        {imageUrl && (
          <div className="">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-12 h-12 rounded-lg"
            />
          </div>
        )}

        <div className="flex gap-8 items-center">
          <div className="grid grid-cols-1">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 "
            >
              Availability
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value === "true")}
              id="availability"
              className="w-fit px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddProduct}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

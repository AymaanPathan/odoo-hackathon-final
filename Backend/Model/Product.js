const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ItemId: {
      type: Number,
      unique: [true, "ItemId Must be Unique"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

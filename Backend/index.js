const express = require("express");
const mongoose = require("mongoose");
const Payment = require("./Payment");
const Auth = require("./Auth/Auth");
const cors = require("cors");
const Product = require("../Backend/Product/Product");
const { upload, uploadFile } = require("./UploadImage/upload"); // Import upload and handler
const path = require("path");
const BorrowRecord = require("./model/BorrowRecord");
const User = require("./Model/User");
const app = express();
const PRODUCT = require("./Model/Product");
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json());

const port = 8080;

// MongoDb Connection
const connectDb = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://aymaan:1234@cluster0.rv9jdh7.mongodb.net/ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    console.log("Connected To DataBase⭐");
  } catch (error) {
    console.log("Error in Mongo", error);
  }
};
connectDb();

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routing
const Router = express.Router();

// Images
Router.post("/upload", upload.single("productImage"), uploadFile);

// Auth
Router.post("/register", Auth.Register);
Router.post("/login", Auth.Login);
Router.put("/profile/update/Email", Auth.protect, Auth.updateEmail);
Router.put("/profile/update/Password", Auth.protect, Auth.updatePassword);

// Send mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "aymaanpathan5@gmail.com",
    pass: "shke aviz whyw uhwd",
  },
});

Router.post("/sendEmail", async (req, res) => {
  try {
    const { email } = req.body;

    const info = await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Here's An Exciting Book For You",
      text: `Hi ${email}, I wanted to share an exciting book that I think you'll love: Rich Dad Poor Dad by Robert T. Kiyosaki. It's a fascinating read that delves into financial education and personal finance. Happy reading!`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send({
      message: "Email sent successfully",
      data: email,
      sub: "Here's An Exciting Book For You",
      mess: `Hi ${email}, I wanted to share an exciting book that I think you'll love: Rich Dad Poor Dad by Robert T. Kiyosaki. It's a fascinating read that delves into financial education and personal finance. Happy reading!`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email", error });
  }
});

// Borrow
Router.get("/user-borrowed-books/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const borrowRecords = await BorrowRecord.find({ user: userId })
      .populate("book", "title author image")
      .populate("user", "username")
      .exec();

    if (borrowRecords.length === 0) {
      return res
        .status(404)
        .json({ error: "No borrowed books found for this user." });
    }

    res.status(200).json(borrowRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post("/borrow", async (req, res) => {
  const { userId, bookId, dueDate } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const book = await PRODUCT.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const borrowRecord = new BorrowRecord({
      user: userId,
      book: bookId,
      dueDate: new Date(dueDate),
    });

    await borrowRecord.save();
    res.status(201).json(borrowRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/user-purchased-products/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("purchasedProducts")
      .exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.purchasedProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Users Auth
Router.get(
  "/role/admin",
  Auth.protect,
  Auth.roleMiddleware(["Admin"]),
  (req, res) => {
    res.send("Admin content");
  }
);

Router.get(
  "/role/librarian",
  Auth.protect,
  Auth.roleMiddleware(["Librarian", "Admin"]),
  (req, res) => {
    res.send("Librarian content");
  }
);

Router.get(
  "/role/user",
  Auth.protect,
  Auth.roleMiddleware(["User", "Librarian", "Admin"]),
  (req, res) => {
    res.send("User content");
  }
);

// Product
Router.get("/all-products", Product.GetAllProducts);
Router.post("/Addproduct", Product.AddProduct);
Router.delete("/delete-product", Product.DeleteProduct);
Router.get("/product/:id", Product.GetOneProduct);
Router.post("/AddToCart", Auth.protect, Product.AddToCart);
Router.post("/RemoveFromCart", Auth.protect, Product.RemoveFromCart);
Router.post("/GetCart", Auth.protect, Product.GetCart);
Router.post("/EmptyCart", Auth.protect, Product.EmptyCart);

// Wishlist
Router.get("/GetWishlist", Auth.protect, Product.GetWishlist);
Router.post("/AddWishlist", Auth.protect, Product.AddWishlist);
Router.post("/RemoveWishlist", Auth.protect, Product.RemoveWishlist);

// Paymen
Router.post("/payment", Auth.protect, Payment.createStripePayment);

// Route to get all
app.use(Router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server Started 🟢`);
});

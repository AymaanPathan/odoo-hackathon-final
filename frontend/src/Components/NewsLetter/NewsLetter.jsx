import { useState } from "react";
import "./newsLetter.css";
import toast from "react-hot-toast";
import women from "./ni.jpg";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading("Sending Mail");

    try {
      const response = await fetch("http://localhost:8080/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.dismiss();
        toast.success("Email Sent");
        setEmail("");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error");
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="newsLetter-main flex px-8 mt-44 select-none bg-[#fff]">
      {/* Left */}
      <div className="left flex flex-col gap-4">
        <div className="text-2xl font-semibold text-gray-200">
          <p className="news-letter-heading text-[#1B2834]">Our Newsletter</p>
        </div>
        <p className="newsLetter-body text-[#1B2834] leading-tight text-6xl">
          Subscribe to Our Newsletter for Coupons on Our Latest Collection
        </p>
        <span className="news-letter-Subtitle text-gray-400">
          Get 20% off on your first order just by subscribing to our newsletter
        </span>
        <form
          onSubmit={handleSubmit}
          className="user-input w-[30rem] flex flex-col gap-2"
        >
          <input
            placeholder="Your business email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="news-letter-input w-full rounded-md focus:outline-none border-2 border-gray-500 bg-gray-200 h-14 text-center"
          />
          <button
            type="submit"
            className="hover:scale-105 duration-200 h-12 w-full whitespace-nowrap rounded-md text-white bg-[#286FE5]"
          >
            Get started
          </button>
        </form>
      </div>

      {/* Right */}
      <div className="right">
        <img
          className="newsLetter-img hero-img h-[35rem] w-[70rem]"
          src={women}
          alt="Newsletter"
        />
      </div>
    </div>
  );
}

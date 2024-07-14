import discount from "./discount.jpg";
import "./offer.css";
import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <div className="main_Offer bg-[#fff] grid grid-cols-2 h-fit mt-24 px-2">
      {/* Right */}
      <div className="right ">
        <img className="offer-img h-full w-[42rem]" src={discount} alt="" />
      </div>

      {/* Left */}
      <div className="left flex flex-col p-16  gap-11">
        <p className="text-[#1B2834] text-2xl font-bold">Limited Time Offers</p>
        <p className="offer-body font-bold text-[#1B2834] text-3xl">
          Streamline Your Library with Our Advanced Management System Act Now 
        </p>
        <span className=" text-gray-400">
        Upgrade to a seamless and efficient library experience with our state-of-the-art software.
        </span>
        <button className="offer-btn bg-[#20dbb0]  inline-flex items-center gap-2 font-semibold w-fit text-white py-2 px-6 rounded-md">
          <Link to="/shop">Borrow now</Link>
          <i className="fas fa-arrow-right hover:translate-x-1 duration-150 text-xl "></i>
        </button>
      </div>
    </div>
  );
}

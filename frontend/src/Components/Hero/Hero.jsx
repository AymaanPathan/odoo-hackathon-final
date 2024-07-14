import "./hero.css";
import { Link } from "react-router-dom";
import hero_img from "./hero_img.png";
import "./Services";
import HeroCard from "./HeroCard";

function Hero() {
  return (
    <div className="main_hero bg-[#fff] flex px-8">
      {/* Left */}
      <div className="left flex flex-col p-16  gap-11 ">
        <div className="discount-main flex items-center gap-3 cursor-pointer w-fit py-2 px-4 rounded-xl bg-white">
          <p className="text-[#1B2834]">
            <pre className="inline-block bg-[#20dbb0]"> </pre>
            <pre className="inline-block">
              <span className="span bg-[#f3fffd]"> Reading Books</span> is best
              investment{" "}
              <span className="underscoreColor  text-[#63dec2] from-neutral-900">
                __
              </span>{" "}
            </pre>
          </p>
        </div>
        <p className="hero-heading-text font-bold text-[#1B2834] text-5xl">
          Read Book Daily To Grow Your Mind
        </p>
        <span className="hero-subtitle text-gray-400">
          Reading book regularly is a great to develop mind and grow life. You
          can get your likeable book here.
        </span>

        <div className="left flex flex-row p-16  gap-5">
          <button className="hero-btn bg-[#20dbb0] inline-flex items-center gap-2 font-semibold w-fit text-white py-2 px-6 rounded-md">
            <Link to="/book/borrow">Get Stated </Link>
            <i className="fas fa-arrow-right hover:translate-x-1 duration-150 text-xl "></i>
          </button>
          <button className="hero-btn-2 bg-[#fffefe] inline-flex items-center gap-2 font-semibold w-fit text-black py-2 px-6 rounded-md border-black border-2">
            <Link to="/book/borrow">Explore </Link>
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="right flex-col">
        <img
          className=" h-[30rem] w-[50rem] rounded-2xl"
          src={hero_img}
          alt=""
        />
        <div className="flex  justify-center mt-10">
          <HeroCard heading="Trending Books" sub="Explore Trending Books" />
          <HeroCard heading="Popular Books" sub="Explore Popular Books" />
          <HeroCard heading="New Books" sub="Explore New Books " />
        </div>
      </div>
    </div>
  );
}

export default Hero;

/* eslint-disable react/prop-types */
import "./hero.css";
import arrow from "./arrow.png";
export default function HeroCard({ heading, sub }) {
  return (
    <div className="text-[#151644] font-bold  pe-6 ">
      <h2> {heading}</h2>
      <p className="text-[12px] py-1 text-[#c9c9ca] "> {sub} </p>
      <img src={arrow} className="bg-transparent h-8 w-8" />
    </div>
  );
}

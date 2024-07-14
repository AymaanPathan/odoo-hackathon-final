import logo from "./logo.png";
import "./footer.css";
import ins from "./ins.png";
import lin from "./lin.png";
import github from "./github.png"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white mt-24 border-t-2 border-gray-200 ">
      <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            <img
              src={logo}
              className="footer-img w-40 h-28"
              alt="Company Logo"
            />
          </div>

          <div>
            <div className="">
              <div>
                <h2 id="contact" className="text-2xl font-bold text-gray-900">
                  Get the latest news!
                </h2>
                <p className="mt-4 text-gray-500">
                Effortlessly Manage Your Library with Our Innovative System.
                Transform operations and enhance efficiency with our user-friendly software.
                </p>
              </div>
            </div>

            <div className=" mt-4">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>
                <div className="border border-gray-100 p-2 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Bob@gmail.com"
                    className="w-full focus:border-none focus:outline-none sm:text-sm"
                  />
                  <button className="mt-1 w-full bg-[#20dbb0] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-[#20efb0] duration-150 sm:mt-0 sm:w-auto sm:shrink-0">
                  <Link to="register"> Sign Up</Link>
                  </button>
                </div>
              </form>
            </div>

            <div className="footer-details mt-4">
              <div>
                
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Landing Page
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Borrow
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Best Selling
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Upcoming
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Hot
                    </a>
                  </li>
                </ul>
              </div>

              <div>
             
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Partners
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Blog
                    </a>
                  </li>
                  
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Call-help
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      guidance
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="mt-8 flex justify-start gap-6 lg:col-span-5 lg:justify-end" >
            <li class="footer-icon">
              <a
                href="https://www.instagram.com/a.r_0705/"
                ><img src={ins} alt="instagram icon"
              /></a>
            </li>
            <li class="footer-icon">
              <a href="https://github.com/AymaanPathan/AymaanPathan"
                ><img
                  src={github}
                  alt="Github icon"
              /></a>
            </li>
            <li class="footer-icon">
              <a href="https://www.linkedin.com/in/afzal-kapadwala/"
                ><img src={lin} alt="linkedin icon"
              /></a>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
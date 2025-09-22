import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import pic1 from "../assets/pic1.svg";
import pic2 from "../assets/pic2.svg";
import pic3 from "../assets/pic3.svg";
import pic4 from "../assets/pic4.svg";
import pic5 from "../assets/pic5.svg";

const images = [pic1, pic2, pic3, pic4, pic5];

function AboutUs() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="relative w-full">
      <div
        id="custom-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        <div className="relative aspect-[16/9] max-h-full overflow-hidden rounded-lg">
          {images.map((imgSrc, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "block" : "hidden"
              } duration-700 ease-in-out`}
              data-carousel-item={index === 0 ? "active" : ""}
            >
              <img
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain block"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default AboutUs;

import { useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://pos.nvncdn.com/5505b3-54183/bn/20240314_suf75JIO.gif",
  },
  {
    id: 2,
    image: "https://pos.nvncdn.com/5505b3-54183/ps/20240306_w1TUjbluz1.jpeg",
  },
  {
    id: 3,
    image: "https://pos.nvncdn.com/5505b3-54183/ps/20240306_Ni6h40sMZh.jpeg",
  },
  {
    id: 4,
    image: "https://pos.nvncdn.com/5505b3-54183/bn/20240314_QAaKMQLz.gif",
  },
  {
    id: 5,
    image: "https://pos.nvncdn.com/5505b3-54183/ps/20230617_SBJnXnrXqf.jpeg",
  },
];

const FirstCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 4;

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - itemsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerView >= slides.length ? 0 : prevIndex + 1
    );
  };

  const visibleSlides =
    slides.slice(startIndex, startIndex + itemsPerView).length === itemsPerView
      ? slides.slice(startIndex, startIndex + itemsPerView)
      : [
          ...slides.slice(startIndex),
          ...slides.slice(0, (startIndex + itemsPerView) % slides.length),
        ];

  return (
    <div className="p-6 rounded-lg">
      <div className="flex gap-32 justify-center">
        {visibleSlides.map((slide) => (
          <div key={slide.id} className="w-64 h-80 overflow-hidden rounded-xl">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#AD3542] text-[#AD3542]  hover:bg-[#FFFDF1]"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#AD3542] text-[#AD3542] hover:bg-[#FFFDF1]"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FirstCarousel;

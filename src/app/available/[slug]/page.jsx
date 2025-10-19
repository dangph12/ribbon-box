import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import giftBoxes from "~/api/gift-boxes.json";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function GiftBoxDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const giftBox = giftBoxes.find((box) => box.slug === slug);

  if (!giftBox) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-[#AD3542]">
          Không tìm thấy sản phẩm
        </h1>
        <button
          onClick={() => navigate("/available")}
          className="mt-4 bg-[#AD3542] text-[#FFFDF1] px-6 py-2 rounded-xl hover:bg-[#C25C61] transition"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? giftBox.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === giftBox.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleBuyNow = () => {
    navigate("/preview", {
      state: {
        name: giftBox.name,
        url: giftBox.thumbnail,
        price: giftBox.price,
      },
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/available")}
        className="mb-4 text-[#AD3542] hover:text-[#C25C61] flex items-center gap-1 text-sm transition"
      >
        <FiChevronLeft size={18} /> Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="relative bg-white rounded-xl shadow-md p-3">
            <img
              src={giftBox.images[currentImageIndex]}
              alt={giftBox.name}
              className="w-full h-auto rounded-lg"
            />

            {giftBox.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#AD3542] p-1.5 rounded-full shadow-md transition"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#AD3542] p-1.5 rounded-full shadow-md transition"
                >
                  <FiChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail navigation */}
          {giftBox.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {giftBox.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition ${
                    currentImageIndex === index
                      ? "border-[#AD3542]"
                      : "border-gray-200 hover:border-[#C25C61]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${giftBox.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Product Information */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-[#AD3542] mb-3">
              {giftBox.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-red-500">
                {giftBox.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-lg line-through text-gray-500">
                {giftBox.oldPrice.toLocaleString("vi-VN")}đ
              </span>
              <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-sm font-semibold">
                -{giftBox.discount}%
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-1.5 bg-gray-50 p-3 rounded-lg">
              {giftBox.giftItems && giftBox.giftItems.length > 0 && (
                <p className="flex items-start gap-2">
                  <span className="font-semibold whitespace-nowrap">
                    Quà bên trong:
                  </span>
                  <span className="flex-1">{giftBox.giftItems.join(", ")}</span>
                </p>
              )}

              <p className="flex items-center gap-2">
                <span className="font-semibold">Trạng thái:</span>
                <span
                  className={`${
                    giftBox.stock
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {giftBox.stock ? "Còn hàng" : "Hết hàng"}
                </span>
              </p>

              {giftBox.occasions && giftBox.occasions.length > 0 && (
                <p className="flex items-start gap-2">
                  <span className="font-semibold whitespace-nowrap">
                    Dịp phù hợp:
                  </span>
                  <span className="flex-1">
                    {giftBox.occasions
                      .map((occasion) => {
                        const occasionMap = {
                          valentine: "Valentine 14-2",
                          "ngay-phu-nu": "Ngày phụ nữ 8/3",
                          "phu-nu-viet-nam": "Phụ nữ Việt Nam 20/10",
                          "nha-giao-viet-nam": "Nhà giáo Việt Nam 20/11",
                        };
                        return occasionMap[occasion] || occasion;
                      })
                      .join(", ")}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <button
              onClick={handleBuyNow}
              disabled={!giftBox.stock}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                giftBox.stock
                  ? "bg-[#AD3542] text-[#FFFDF1] hover:bg-[#C25C61]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {giftBox.stock ? "Mua ngay" : "Hết hàng"}
            </button>
            {giftBox.description && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#AD3542] mb-3">
                  Mô Tả Sản Phẩm
                </h2>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {giftBox.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaBoxOpen, FaCubes, FaTags, FaClipboardList } from "react-icons/fa";

const HowToShop = () => {
  const items = [
    {
      icon: <FaBoxOpen className="text-4xl mb-4 text-black" />,
      title: "SẢN PHẨM CÓ SẴN",
      description: "Hộp quà được chọn lọc sẵn, sẵn sàng để sử dụng",
      action: "MUA NGAY",
    },
    {
      icon: <FaCubes className="text-4xl mb-4 text-black" />,
      title: "TỰ TẠO HỘP QUÀ",
      description: "Tự tay chọn và tạo hộp quà theo ý thích",
      action: "BẮT ĐẦU TẠO QUÀ",
    },
    {
      icon: <FaTags className="text-4xl mb-4 text-black" />,
      title: "THỊ TRƯỜNG",
      description: "Mua sắm những sản phẩm tuyệt vời cho bản thân bạn!",
      action: "KHÁM PHÁ NGAY",
    },
    {
      icon: <FaClipboardList className="text-4xl mb-4 text-black" />,
      title: "QUÀ TẶNG DOANH NGHIỆP",
      description: "Quà tặng theo yêu cầu hoặc quảng bá thương hiệu",
      action: "LIÊN HỆ NGAY",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h1 className="text-[#AD3542] font-semibold text-sm mb-1 tracking-widest">
        CÁCH MUA HÀNG
      </h1>
      <div className="w-10 h-1 bg-gray-200 mx-auto mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon}
            <h3 className="mt-4 font-bold text-lg uppercase tracking-wide text-[#AD3542]">
              {item.title}
            </h3>
            <p className="text-l text-[#C25C61] mt-2">{item.description}</p>
            <a
              href="#"
              className="mt-3 text-sm underline font-medium text-black hover:text-gray-700"
            >
              {item.action}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToShop;

import { FiTruck, FiBox, FiPhoneCall, FiHome } from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={24} className="text-white" />,
    title: "GIAO HÀNG TOÀN QUỐC",
    desc: "Miễn phí giao hàng nội thành hoá đơn trên 5 triệu",
  },
  {
    icon: <FiBox size={24} className="text-white" />,
    title: "CHÍNH SÁCH ĐỔI SẢN PHẨM LINH HOẠT",
    desc: "Đổi sản phẩm vui lòng liên hệ hotline",
  },
  {
    icon: <FiPhoneCall size={24} className="text-white" />,
    title: "QUÀ TẶNG VÀ TRANG TRÍ CAO CẤP",
    desc: "Dẫn đầu xu hướng decor và trang trí hộp quà",
  },
  {
    icon: <FiHome size={24} className="text-white" />,
    title: "TÍNH CÁ NHÂN HÓA CAO",
    desc: "Thiết kế hộp quà mang đậm dấu ấn của riêng bạn",
  },
];

export default function Approve() {
  return (
    <div className="bg-gray py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div key={idx} className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-black">
              {item.icon}
            </div>
            <h3 className="font-bold text-sm mb-1 uppercase text-[#AD3542]">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

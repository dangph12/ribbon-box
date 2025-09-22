import { FaStar } from "react-icons/fa";
import logo from "../assets/3.png";

const testimonials = [
  {
    company: "Pfizer",
    logo: logo,
    quote:
      "Tôi thậm chí không biết diễn tả hết sự vui mừng! Gói quà và sản phẩm rất tuyệt vời. Xin cảm ơn đội ngũ tuyệt vời của bạn thay mặt chúng tôi!",
    name: "Ron K",
  },
  {
    company: "The Agency",
    logo: logo,
    quote:
      "Từ khâu chọn quà đến vận chuyển, đội ngũ Ribbon Box thật tận tâm, sáng tạo và hỗ trợ nhiệt tình!",
    name: "The Whitman Team",
  },
  {
    company: "Rocket Insights",
    logo: logo,
    quote:
      "Ribbon Box đã giúp chúng tôi giải quyết việc tặng quà cho nhân sự làm việc từ xa mới!",
    name: "Imogene, Majordomo",
  },
];

export default function FeedBack() {
  return (
    <section className="bg-[#e8edfd] py-16 px-4 sm:px-6 lg:px-20 xl:px-32 w-full">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif text-indigo-900 italic mb-12">
          Feedback
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
            >
              <div className="mb-4 flex justify-center">
                <img src={item.logo} alt={item.company} className="h-10" />
              </div>
              <p className="text-gray-800 text-sm mb-4 leading-relaxed">
                “{item.quote}”
              </p>
              <p className="font-semibold text-indigo-900 mb-2">{item.name}</p>
              <div className="flex justify-center text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

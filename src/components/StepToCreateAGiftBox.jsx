import { Link } from "react-router";
import demo1 from "../assets/demo1.svg";
import demo2 from "../assets/demo2.svg";
import demo3 from "../assets/demo3.svg";

const steps = [
  {
    number: "1",
    title: "Chọn quà tặng bên trong quà",
    image: demo1,
  },
  {
    number: "2",
    title: "Chọn hộp quà & thiệp",
    image: demo2,
  },
  {
    number: "3",
    title: "Chill & chờ Ribbon Box giao đến cho bạn",
    image: demo3,
  },
];

export default function StepToCreateAGiftBox() {
  return (
    <section className="bg-[#fff9f6] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-gray-900 mb-16">
          Hướng dẫn tạo hộp quà của Riêng Bạn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border-2 border-indigo-800 rounded-full flex items-center justify-center font-semibold text-indigo-800 text-lg">
                  {step.number}
                </div>
                <p className="text-base font-medium text-indigo-800">
                  {step.title}
                </p>
              </div>
              <img
                src={step.image}
                alt={`Bước ${step.number}`}
                className="w-full max-w-md object-contain"
              />
            </div>
          ))}
        </div>

        <button className="mt-16 px-10 py-4 rounded-full border border-black bg-[#FFFDF1] hover:bg-[#EDCCB3] transition font-semibold text-lg text-[#AD3542]">
          <Link to={"/home/design"}>
            Bắt đầu tuỳ chỉnh hộp quà của bạn với Ribbon Box nhé
          </Link>
        </button>
      </div>
    </section>
  );
}

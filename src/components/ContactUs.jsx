import { FaWhatsapp, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import contact from "../assets/contact.svg";

const ContactUs = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen px-6 lg:px-20 py-10 gap-10">
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl font-serif font-semibold text-[#AD3542] mb-2">
          Liên Hệ Với Chúng Tôi
        </h1>
        <p className="text-[#AD3542] mb-4">Ribbon Box</p>
        <p className="text-sm text-gray-600 mb-6">
          Nếu có bất cứ vấn đề gì, hãy liên hệ với Ribbon Box thông qua các kênh
          sau
        </p>

        <div className="space-y-3 text-[#5A5A5A] text-sm mb-8">
          <p className="flex items-center gap-2">
            <FaWhatsapp className="text-green-500" /> +84 123456789
          </p>
          <p className="flex items-center gap-2">
            <FaFacebookMessenger className="text-blue-500" /> @RibbonBox
          </p>
          <p className="flex items-center gap-2">
            <FaInstagram className="text-pink-500" /> @RibbonBox
          </p>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Tên Người Gửi"
            className="w-full border border-[#AD3542] rounded-full px-4 py-2 focus:outline-none text-[#AD3542]"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#AD3542] rounded-full px-4 py-2 focus:outline-none text-[#AD3542]"
          />
          <textarea
            placeholder="Thông Điệp"
            rows="4"
            className="w-full border border-[#AD3542] rounded-lg px-4 py-2 focus:outline-none text-[#AD3542]"
          />
          <button
            type="submit"
            className="w-full bg-[#AD3542] text-white rounded-full py-2 hover:bg-[#C25C61] transition"
          >
            Gửi
          </button>
        </form>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src={contact}
          alt="Ribbon Box"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ContactUs;

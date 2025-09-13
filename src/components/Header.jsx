import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/2.png";
import { FiUser, FiShoppingCart, FiChevronDown } from "react-icons/fi";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { to: "/home", label: "Trang Chủ" },
    { to: "/home/design", label: "Bắt Đầu Thiết Kế" },
    { to: "/home/available", label: "Hộp Quà Có Sẵn" },
    { to: "/home/about", label: "Về Chúng Tôi" },
    { to: "/home/Contact", label: "Contact" },
  ];

  const serviceItems = [
    { to: "/home/service/option1", label: "Quà 8-4" },
    { to: "/home/service/option2", label: "Quà Sinh Nhật" },
    { to: "/home/service/option3", label: "Quà Kỉ Niệm" },
    { to: "/home/service/option3", label: "Quà Cưới" },
  ];

  return (
    <div>
      <nav className="bg-[#FFFDF1] border-gray-200 w-full">
        <div className="flex flex-wrap items-center justify-between p-5">
          <Link
            to="/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <img src={logo} className="max-h-40 max-w-full" alt="Logo" />
          </Link>

          <div className="flex md:order-2 space-x-6">
            <Link
              to="/auth/login"
              className="text-[#AD3542] hover:text-red-600 text-4xl"
              aria-label="Login"
            >
              <FiUser />
            </Link>
            <Link
              to="/cart"
              className="text-[#AD3542] hover:text-red-600 text-4xl"
              aria-label="Cart"
            >
              <FiShoppingCart />
            </Link>
          </div>

          <div
            className="hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-default"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#FFFDF1] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#FFFDF1]">
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block py-2 px-3 text-[#AD3542] hover:text-[#C25C61] text-lg"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 py-2 px-3 text-[#AD3542] hover:text-[#C25C61] text-lg focus:outline-none"
                >
                  Dịch Vụ <FiChevronDown className="mt-[2px]" />
                </button>

                {showDropdown && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <ul className="py-5 text-sm text-gray-700">
                      {serviceItems.map(({ to, label }) => (
                        <li key={to}>
                          <Link
                            to={to}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

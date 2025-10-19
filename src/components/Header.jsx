import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/2.png";
import { FiUser, FiShoppingCart, FiChevronDown } from "react-icons/fi";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Trang Chủ" },
    { to: "/design-giftbox", label: "Bắt Đầu Thiết Kế" },
    { to: "/available", label: "Hộp Quà Có Sẵn" },
    { to: "/about", label: "Về Chúng Tôi" },
    { to: "/contact", label: "Liên hệ" },
  ];

  const serviceItems = [
    { to: "/available?occasion=valentine", label: "Quà Valentine 14-2" },
    { to: "/available?occasion=ngay-phu-nu", label: "Ngày phụ nữ 8/3" },
    {
      to: "/available?occasion=phu-nu-viet-nam",
      label: "Phụ nữ Việt Nam 20/10",
    },
    {
      to: "/available?occasion=nha-giao-viet-nam",
      label: "Quà ngày nhà giáo Việt Nam 20/11",
    },
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
              to="/history"
              className="text-[#AD3542] hover:text-red-600 text-4xl"
              aria-label="Cart"
            >
              <FiShoppingCart />
            </Link>
          </div>

          <button
            className="md:hidden text-[#AD3542] hover:text-red-600 text-4xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FiChevronDown />
          </button>

          {mobileMenuOpen && (
            <div className="md:hidden w-full bg-[#FFFDF1] p-4 mt-2 rounded-lg shadow-lg">
              <ul className="flex flex-col space-y-2">
                {navItems.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="block text-[#AD3542] hover:text-[#C25C61] text-lg"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-1 py-2 text-[#AD3542] hover:text-[#C25C61] text-lg"
                  >
                    Quà tặng nhân ngày <FiChevronDown className="mt-[2px]" />
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
          )}

          <div
            className="hidden md:flex md:w-auto md:order-1"
            id="navbar-default"
          >
            <ul className="flex font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#FFFDF1] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#FFFDF1]">
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

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>NMG</h3>
            <p className='text-gray-400 mb-4'>
              Điểm đến lý tưởng cho mọi nhu cầu mua sắm của bạn. Sản phẩm chất
              lượng, giá cả cạnh tranh và dịch vụ khách hàng tuyệt vời.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FaFacebook size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FaTwitter size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FaInstagram size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Liên kết nhanh</h3>
            {/* <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul> */}
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Dịch vụ khách hàng</h3>
            {/* <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Privacy Policy
                </a>
              </li>
            </ul> */}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Liên hệ với chúng tôi</h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <FiMapPin className='text-gray-400' />
                <span className='text-gray-400'>
                  3 Đ. Cầu Giấy, Ngọc Khánh, Đống Đa, Hà Nội, Việt Nam
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <FiPhone className='text-gray-400' />
                <span className='text-gray-400'>19003259</span>
              </div>
              <div className='flex items-center space-x-3'>
                <FiMail className='text-gray-400' />
                <span className='text-gray-400'>hotro@NMG.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='text-center text-gray-400'>
            <p>
              &copy; {new Date().getFullYear()} NMG. Mọi quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

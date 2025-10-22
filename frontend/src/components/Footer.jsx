import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-gray-800 text-gray-300 pt-10 pb-6 px-6 md:px-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Logo and Tagline */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold text-red-500 tracking-wide hover:text-white transition duration-300"
          >
            Stream<span className="text-white">AI</span>
          </Link>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Stream smarter, faster, and cleaner with AI-powered features —
            bringing the next evolution in live entertainment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/stream" className="hover:text-red-500 transition">
                Streams
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-red-500 transition">
                Login / Sign-in
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
            Connect with Us
          </h2>
          <div className="flex justify-center md:justify-start space-x-5">
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="YouTube"
            >
              <FaYoutube size={22} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="Twitter"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-6"></div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-semibold">StreamAI</span> — All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

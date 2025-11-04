import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">GreenNest</h3>
          <p className="text-green-200 mt-2">Your home for healthy indoor plants.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-green-300">About</a></li>
            <li><a href="#" className="hover:text-green-300">Contact</a></li>
            <li><a href="#" className="hover:text-green-300">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex gap-4 mt-2 text-2xl">
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-500"><FaPinterestP /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-sm">
        © 2025 GreenNest. All rights reserved.
      </div>
    </footer>
  );
}

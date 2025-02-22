
const Footer = () => {
  // style={{background: "linear-gradient(145deg, #bbf7d0, #93c5fd)"}} 
  return (
    <footer className="text-gray-200 !bg-gray-800 py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            We are committed to providing the best delivery service in the city. Our top-rated delivery personnel ensure that your packages arrive safely and on time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center space-x-2">
              <span>📍</span>
              <span>123 Delivery Lane, City, Country</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span>+123 456 7890</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✉️</span>
              <span>info@dropdesk.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 DropDesk. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

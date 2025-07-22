function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-4 text-sm">
          <a href="/about" className="hover:text-green-600 transition-colors">
            About
          </a>
          <a href="/contact" className="hover:text-green-600 transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-green-600 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

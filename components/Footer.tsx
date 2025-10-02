import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liga Deals Berlin</h3>
            <p className="text-gray-400 mb-4">
              מועדון ההטבות המוביל בברלין. הצטרפו אלינו ותיהנו מהטבות בלעדיות, תכנים מעניינים וקהילה תומכת.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://wa.me/493012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="/gallery/photos" className="text-gray-400 hover:text-white transition-colors">
                  גלריית תמונות
                </Link>
              </li>
              <li>
                <Link href="/gallery/videos" className="text-gray-400 hover:text-white transition-colors">
                  גלריית וידאו
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-gray-400 hover:text-white transition-colors">
                  המלצות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">יצירת קשר</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="ml-2">📧</span>
                <a href="mailto:info@ligadeals-berlin.com" className="hover:text-white transition-colors">
                  info@ligadeals-berlin.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="ml-2">📱</span>
                <a href="tel:+493012345678" className="hover:text-white transition-colors">
                  +49 30 1234 5678
                </a>
              </li>
              <li className="flex items-start">
                <span className="ml-2">📍</span>
                <span>ברלין, גרמניה</span>
              </li>
              <li className="flex items-start">
                <span className="ml-2">⏰</span>
                <span>ראשון - חמישי: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Liga Deals Berlin. כל הזכויות שמורות.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
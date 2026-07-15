import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-400">Liga Deals Berlin</h3>
            <p className="text-navy-100 mb-4">
              מועדון ההטבות המוביל בברלין. הצטרפו אלינו ותיהנו מהטבות בלעדיות, תכנים מעניינים וקהילה תומכת.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-gold-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-gold-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://wa.me/493012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-200 hover:text-gold-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-400">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-navy-100 hover:text-white transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-navy-100 hover:text-white transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="/gallery/photos" className="text-navy-100 hover:text-white transition-colors">
                  גלריית תמונות
                </Link>
              </li>
              <li>
                <Link href="/gallery/videos" className="text-navy-100 hover:text-white transition-colors">
                  גלריית וידאו
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-navy-100 hover:text-white transition-colors">
                  המלצות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-navy-100 hover:text-white transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-400">יצירת קשר</h3>
            <ul className="space-y-3 text-navy-100">
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
        <div className="border-t border-navy-600 mt-8 pt-8 text-center">
          <p className="text-navy-200">
            © {currentYear} Liga Deals Berlin. כל הזכויות שמורות.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-navy-200 hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <span className="text-navy-500">|</span>
            <Link href="/terms" className="text-navy-200 hover:text-white transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import type { SiteSettings } from "@/lib/sanity/siteSettings";

interface FooterProps {
  settings: SiteSettings;
}

const Footer = ({ settings }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { email, phone, whatsapp, facebook, instagram, twitter, linkedin } = settings;
  const socialLinks = [
    { name: "Facebook", href: facebook, icon: FaFacebook },
    { name: "Instagram", href: instagram, icon: FaInstagram },
    { name: "Twitter", href: twitter, icon: FaTwitter },
    { name: "LinkedIn", href: linkedin, icon: FaLinkedin },
  ].filter((social): social is typeof social & { href: string } => Boolean(social.href));

  return (
    <footer className="bg-navy-800 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-400">Traveliga</h3>
            <p className="text-navy-100 mb-4">
              כל מה שצריך לחופשה מושלמת בברלין: מדריכים בעברית, המלצות מקומיות וליווי אישי של מיטל - מומחית ברלין שגרה בעיר 17 שנה.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-200 hover:text-gold-400 transition-colors"
                  aria-label={name}
                >
                  <Icon size={24} />
                </a>
              ))}
              <a
                href={`https://wa.me/${whatsapp}`}
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
                <Link href="/berlin" className="text-navy-100 hover:text-white transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-navy-100 hover:text-white transition-colors">
                  אודות
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
              <li>
                <Link href="/" className="text-navy-100 hover:text-white transition-colors">
                  תפריט ראשי
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-400">יצירת קשר</h3>
            <ul className="space-y-3 text-navy-100">
              <li className="flex items-start">
                <span className="ml-2 mt-1 text-gold-400"><FaEnvelope className="h-4 w-4" /></span>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start">
                <span className="ml-2 mt-1 text-gold-400"><FaPhoneAlt className="h-4 w-4" /></span>
                <a href={`tel:${phone.replace(/\s/g, '')}`} dir="ltr" className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start">
                <span className="ml-2 mt-1 text-gold-400"><FaWhatsapp className="h-4 w-4" /></span>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              {instagram && (
                <li className="flex items-start">
                  <span className="ml-2 mt-1 text-gold-400"><FaInstagram className="h-4 w-4" /></span>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {facebook && (
                <li className="flex items-start">
                  <span className="ml-2 mt-1 text-gold-400"><FaFacebook className="h-4 w-4" /></span>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-600 mt-8 pt-8 text-center">
          <p className="text-navy-200">
            © {currentYear} Traveliga. כל הזכויות שמורות.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-navy-200 hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <span className="text-navy-500" aria-hidden="true">|</span>
            <Link href="/terms" className="text-navy-200 hover:text-white transition-colors">
              תנאי שימוש
            </Link>
            <span className="text-navy-500" aria-hidden="true">|</span>
            <Link href="/accessibility" className="text-navy-200 hover:text-white transition-colors">
              הצהרת נגישות
            </Link>
            <span className="text-navy-500" aria-hidden="true">|</span>
            <CookieSettingsButton className="text-navy-200 hover:text-white transition-colors underline-offset-2 hover:underline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import { getSiteSettings } from '@/lib/sanity/siteSettings';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יש לכם שאלות? מתכננים טיול לברלין? צרו איתנו קשר בכל שאלה או הצעה.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-4">
          צור קשר
        </h1>
        <p className="text-navy-400 dark:text-gray-300 text-lg mb-4">
          נשמח לשמוע ממך! צור איתנו קשר בכל שאלה או הצעה.
        </p>
        <p className="text-navy-400 dark:text-gray-300 mb-12">
          הפרטים שתמסרו מטופלים לפי{' '}
          <Link
            href="/privacy"
            className="font-semibold text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
          >
            מדיניות הפרטיות
          </Link>{' '}
          שלנו.
        </p>
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm whatsappNumber={settings.whatsapp} />
          <ContactInfo
            phone={settings.phone}
            email={settings.email}
            whatsapp={settings.whatsapp}
            socialMedia={{
              facebook: settings.facebook,
              instagram: settings.instagram,
              linkedin: settings.linkedin,
            }}
          />
        </div>
      </div>
    </div>
  );
}

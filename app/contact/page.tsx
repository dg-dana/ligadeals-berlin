import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יש לכם שאלות? רוצים להצטרף למועדון? צרו איתנו קשר בכל שאלה או הצעה.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          צור קשר
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">
          נשמח לשמוע ממך! צור איתנו קשר בכל שאלה או הצעה.
        </p>
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}

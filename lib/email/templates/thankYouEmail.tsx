import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface ThankYouEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ThankYouEmail = ({ name }: ThankYouEmailProps) => {
  const displayName = name || 'חבר/ה יקר/ה';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traveliga.com';

  return (
    <Html dir="rtl" lang="he">
      <Head />
      <Preview>תודה שפנית אלינו {displayName}! נחזור אליך בהקדם.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>תודה שפנית אלינו! 🙏</Heading>
          </Section>

          <Section style={content}>
            <Text style={greeting}>שלום {displayName},</Text>

            <Text style={paragraph}>
              תודה רבה שפנית אלינו דרך אתר Traveliga!
            </Text>

            <Text style={paragraph}>
              קיבלנו את הודעתך ואנחנו כבר עובדים על זה. אנו נעשה את מירב המאמצים
              לחזור אליך תוך <strong>24-48 שעות</strong>.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                💡 <strong>בינתיים...</strong>
              </Text>
              <Text style={highlightContent}>
                אתה מוזמן לבקר באתר שלנו ולקרוא את המאמרים והתכנים המעניינים שיש לנו
                להציע.
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button href={siteUrl} style={button}>
                בקרו באתר שלנו
              </Button>
            </Section>

            <Hr style={divider} />

            <Section style={infoSection}>
              <Text style={infoHeading}>מה קורה עכשיו?</Text>
              <ul style={list}>
                <li style={listItem}>✅ קיבלנו את הודעתך בהצלחה</li>
                <li style={listItem}>👀 אנחנו בודקים את הפרטים</li>
                <li style={listItem}>📧 נחזור אליך בהקדם האפשרי</li>
                <li style={listItem}>💬 תוכל לענות ישירות לאימייל זה</li>
              </ul>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              <strong>צריך משהו דחוף?</strong>
            </Text>
            <Text style={paragraph}>
              אם זה דחוף, אתה מוזמן ליצור איתנו קשר ישירות:
            </Text>

            <Section style={contactInfo}>
              <Text style={contactText}>
                📧 Email:{' '}
                <a
                  href={`mailto:${process.env.CONTACT_EMAIL || 'contact@traveliga.com'}`}
                  style={link}
                >
                  {process.env.CONTACT_EMAIL || 'contact@traveliga.com'}
                </a>
              </Text>
              <Text style={contactText}>
                🌐 Website:{' '}
                <a href={siteUrl} style={link}>
                  traveliga.com
                </a>
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={closing}>
              אנחנו מודים לך על הסבלנות ומצפים לדבר איתך בקרוב!
            </Text>

            <Text style={signature}>
              בברכה,
              <br />
              <strong>צוות Traveliga</strong>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              קיבלת מייל זה כי פנית אלינו דרך טופס יצירת הקשר באתר Traveliga.
            </Text>
            <Text style={footerText}>
              אם לא פנית אלינו, אנא התעלם ממייל זה או{' '}
              <a href={`mailto:${process.env.CONTACT_EMAIL}`} style={link}>
                יידע אותנו
              </a>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Default props for preview/testing
ThankYouEmail.PreviewProps = {
  name: 'דוד כהן',
  email: 'david.cohen@example.com',
  message: 'שלום, אני מעוניין לקבל מידע נוסף.',
} as ThankYouEmailProps;

export default ThankYouEmail;

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
  direction: 'rtl' as const,
  textAlign: 'right' as const,
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '8px 8px 0 0',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const headerHeading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '0 0 8px 8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const greeting = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '0 0 20px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.8',
  color: '#666666',
  margin: '0 0 15px 0',
};

const divider = {
  borderTop: '1px solid #e0e0e0',
  margin: '30px 0',
};

const highlightBox = {
  backgroundColor: '#f0f7ff',
  border: '2px solid #667eea',
  borderRadius: '8px',
  padding: '20px',
  margin: '25px 0',
};

const highlightText = {
  fontSize: '16px',
  color: '#667eea',
  margin: '0 0 10px 0',
};

const highlightContent = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#667eea',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '14px 40px',
  borderRadius: '8px',
  display: 'inline-block',
};

const infoSection = {
  margin: '25px 0',
};

const infoHeading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '0 0 15px 0',
};

const list = {
  margin: '0',
  padding: '0 0 0 20px',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '2',
  color: '#666666',
};

const contactInfo = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const contactText = {
  fontSize: '15px',
  color: '#666666',
  margin: '8px 0',
};

const link = {
  color: '#667eea',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
};

const closing = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#333333',
  margin: '20px 0',
};

const signature = {
  fontSize: '16px',
  lineHeight: '1.8',
  color: '#333333',
  margin: '20px 0 0 0',
};

const footer = {
  backgroundColor: '#f5f5f5',
  padding: '25px',
  borderRadius: '6px',
  marginTop: '30px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#999999',
  margin: '5px 0',
};

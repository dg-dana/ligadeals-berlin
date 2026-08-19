import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  message,
}: ContactFormEmailProps) => {
  const formattedDate = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Html dir="rtl" lang="he">
      <Head />
      <Preview>הודעה חדשה מ-{name} - Traveliga</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerHeading}>
              הודעה חדשה מאתר Traveliga
            </Heading>
          </Section>

          <Section style={content}>
            <Text style={greeting}>שלום,</Text>
            <Text style={paragraph}>
              קיבלת הודעה חדשה מטופס יצירת הקשר באתר.
            </Text>

            <Hr style={divider} />

            <Section style={infoSection}>
              <Text style={label}>שם המשתמש:</Text>
              <Text style={value}>{name}</Text>
            </Section>

            <Section style={infoSection}>
              <Text style={label}>כתובת אימייל:</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>
            </Section>

            {phone && (
              <Section style={infoSection}>
                <Text style={label}>מספר טלפון:</Text>
                <Text style={value}>
                  <Link href={`tel:${phone}`} style={link}>
                    {phone}
                  </Link>
                </Text>
              </Section>
            )}

            <Hr style={divider} />

            <Section style={messageSection}>
              <Text style={label}>תוכן ההודעה:</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={divider} />

            <Text style={actionText}>
              💡 <strong>טיפ:</strong> תוכל להשיב ישירות לאימייל זה כדי לענות ל-{name}.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              הודעה זו נשלחה מטופס יצירת קשר באתר Traveliga
            </Text>
            <Text style={footerText}>תאריך: {formattedDate}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Default props for preview/testing
ContactFormEmail.PreviewProps = {
  name: 'דוד כהן',
  email: 'david.cohen@example.com',
  phone: '+972-50-123-4567',
  message: 'שלום, אני מעוניין לקבל מידע נוסף על השירותים שלכם. תודה!',
} as ContactFormEmailProps;

export default ContactFormEmail;

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
  padding: '30px',
  textAlign: 'center' as const,
};

const headerHeading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '0 0 8px 8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const greeting = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '0 0 10px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#666666',
  margin: '0 0 20px 0',
};

const divider = {
  borderTop: '1px solid #e0e0e0',
  margin: '20px 0',
};

const infoSection = {
  marginBottom: '15px',
};

const label = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '0 0 5px 0',
};

const value = {
  fontSize: '16px',
  color: '#666666',
  backgroundColor: '#f9f9f9',
  padding: '10px 15px',
  borderRadius: '6px',
  margin: '0',
};

const link = {
  color: '#667eea',
  textDecoration: 'none',
};

const messageSection = {
  marginTop: '20px',
};

const messageText = {
  fontSize: '16px',
  lineHeight: '1.8',
  color: '#333333',
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '6px',
  border: '1px solid #e0e0e0',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
};

const actionText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#666666',
  margin: '20px 0 0 0',
  padding: '15px',
  backgroundColor: '#fff9e6',
  borderRadius: '6px',
  border: '1px solid #ffe066',
};

const footer = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '6px',
  marginTop: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  color: '#666666',
  margin: '5px 0',
};

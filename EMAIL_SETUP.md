# Email Configuration Guide - Resend Setup

This guide will help you set up email functionality for the LigaDeals Berlin website using Resend.

## Why Resend?

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Easy Integration**: Simple REST API
- **React Email Support**: Beautiful email templates with React components
- **Reliable Delivery**: High deliverability rates
- **Developer Friendly**: Great documentation and testing tools

## Step-by-Step Setup

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" (you can use GitHub authentication)
3. Verify your email address
4. Complete the onboarding process

### 2. Get Your API Key

1. Log in to [resend.com](https://resend.com)
2. Navigate to **API Keys** in the sidebar
3. Click **"Create API Key"**
4. Give it a name (e.g., "LigaDeals Berlin Production")
5. Select permissions:
   - ✅ Sending access
6. Click **"Create"**
7. **Copy the API key** (it starts with `re_`)
   - ⚠️ **Important**: Save it securely - you won't see it again!

### 3. Domain Verification (Optional but Recommended)

For production, you should verify your domain to send emails from `noreply@ligadeals-berlin.com` instead of `noreply@resend.dev`.

#### Steps:

1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain: `ligadeals-berlin.com`
4. Add the provided DNS records to your domain registrar:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT) - optional

#### DNS Records Example:

```
Type: TXT
Name: @
Value: v=spf1 include:resend.net ~all

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@ligadeals-berlin.com
```

5. Wait for DNS propagation (can take up to 48 hours)
6. Click **"Verify Domain"** in Resend dashboard

### 4. Configure Environment Variables

Open your `.env.local` file and add your credentials:

```env
# Resend Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx

# Email addresses
RESEND_FROM_EMAIL=LigaDeals <noreply@ligadeals-berlin.com>
CONTACT_EMAIL=your_email@example.com

# Sanity Webhook Secret
SANITY_WEBHOOK_SECRET=your_webhook_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Environment Variables Explained:

- **RESEND_API_KEY**: Your Resend API key (starts with `re_`)
- **RESEND_FROM_EMAIL**: The email address that appears in the "From" field
  - Before domain verification: use `onboarding@resend.dev`
  - After domain verification: use `noreply@ligadeals-berlin.com`
- **CONTACT_EMAIL**: Your email address where contact form submissions are sent
- **SANITY_WEBHOOK_SECRET**: Secret for validating Sanity webhooks (generate with: `openssl rand -base64 32`)
- **NEXT_PUBLIC_SITE_URL**: Your website URL (for production: `https://ligadeals-berlin.com`)

### 5. Testing Your Configuration

#### Test in Development:

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to your contact form page
3. Submit a test message
4. Check:
   - ✅ The contact form submission succeeds
   - ✅ You receive the contact form email at your CONTACT_EMAIL
   - ✅ The sender receives a thank you email

#### Check Resend Dashboard:

1. Go to [resend.com/emails](https://resend.com/emails)
2. View your sent emails
3. Check delivery status, opens, clicks, etc.

### 6. Generate Webhook Secret

For the Sanity revalidation webhook, generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and add it to your `.env.local`:

```env
SANITY_WEBHOOK_SECRET=your_generated_secret_here
```

### 7. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables to your hosting platform
2. Update `NEXT_PUBLIC_SITE_URL` to your production URL
3. Update `RESEND_FROM_EMAIL` to use your verified domain
4. Test the contact form on production

## Email Templates

The project includes two React Email templates:

### 1. Contact Form Email (to admin)
- **Location**: `/lib/email/templates/contactFormEmail.tsx`
- **Purpose**: Notify admin of new contact form submissions
- **Features**:
  - Customer information (name, email, phone)
  - Message content
  - Direct reply-to functionality
  - Professional Hebrew design with RTL support

### 2. Thank You Email (to customer)
- **Location**: `/lib/email/templates/thankYouEmail.tsx`
- **Purpose**: Auto-reply to customers who submit the contact form
- **Features**:
  - Personalized greeting
  - Response time expectations
  - Links to website
  - Contact information
  - Hebrew design with emojis

## Email Functions

The `/lib/email/sendEmail.ts` file provides several functions:

- **`sendContactFormEmail(data)`**: Send contact form to admin
- **`sendThankYouEmail(data)`**: Send auto-reply to customer
- **`sendContactEmails(data)`**: Send both emails in parallel
- **`testEmailConfig()`**: Verify email configuration

## Troubleshooting

### "Invalid API Key" Error

- Double-check your API key in `.env.local`
- Ensure it starts with `re_`
- Verify you're using the correct key for your environment

### Emails Not Being Delivered

1. Check Resend dashboard for delivery status
2. Verify your domain (if using custom domain)
3. Check spam folder
4. Review DNS records
5. Check rate limits (100/day on free tier)

### "Failed to send email" Error

1. Check server logs for detailed error messages
2. Verify all environment variables are set
3. Test API key with curl:
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your_email@example.com",
       "subject": "Test Email",
       "html": "<h1>Test</h1>"
     }'
   ```

### Hebrew Characters Not Displaying

- Ensure your email client supports UTF-8
- Check that the HTML meta charset is set to UTF-8
- Verify RTL CSS styles are applied

## Rate Limits

### Free Tier:
- 100 emails per day
- 3,000 emails per month
- No credit card required

### Paid Plans:
If you exceed the free tier, consider upgrading:
- **Pay as you go**: $0.001 per email
- **Pro**: $20/month (50,000 emails included)
- Visit [resend.com/pricing](https://resend.com/pricing)

## Monitoring

### Resend Dashboard:
- View sent emails
- Check delivery rates
- Monitor bounces and complaints
- Track opens and clicks (with tracking enabled)

### Application Logs:
The email functions include comprehensive logging:
- Success confirmations with message IDs
- Error messages with details
- Request timestamps

## Security Best Practices

1. ✅ Never commit `.env.local` to git
2. ✅ Use different API keys for development and production
3. ✅ Rotate API keys periodically
4. ✅ Enable webhook signature validation
5. ✅ Implement rate limiting on contact form
6. ✅ Validate and sanitize user input
7. ✅ Use HTTPS in production

## Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: [resend.com/support](https://resend.com/support)
- **React Email**: [react.email](https://react.email)

## Next Steps

1. ✅ Complete this setup guide
2. ⬜ Test contact form functionality
3. ⬜ Verify domain for production
4. ⬜ Set up webhook for Sanity revalidation
5. ⬜ Monitor email delivery in production
6. ⬜ Consider upgrading if you need more emails

---

**Need Help?** Check the Resend documentation or contact their support team. They're very responsive and helpful!

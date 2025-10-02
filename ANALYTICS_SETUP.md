# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for the LigaDeals Berlin website.

## Why Google Analytics 4?

- **Free Forever**: No cost for up to 10 million events per month
- **Privacy-Focused**: GDPR compliant with consent mode
- **Event-Based Tracking**: Track custom user interactions
- **Real-Time Data**: See what's happening on your site right now
- **Cross-Platform**: Track web, iOS, and Android in one property
- **Machine Learning**: Automatic insights and predictions

## Step-by-Step Setup

### 1. Create a Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Start measuring"** or **"Admin"** (if you already have an account)
3. In the Admin panel, click **"Create Account"**
4. Enter account details:
   - **Account Name**: "LigaDeals Berlin"
   - Check the data sharing settings you're comfortable with
5. Click **"Next"**

### 2. Create a Property

1. Enter property details:
   - **Property Name**: "LigaDeals Berlin Website"
   - **Reporting Time Zone**: "Germany (GMT+1)"
   - **Currency**: "Euro (EUR)"
2. Click **"Next"**
3. Fill in business information:
   - **Industry Category**: "News and Media" or "Community and Society"
   - **Business Size**: Select your size
4. Select business objectives (choose what applies):
   - ✅ Examine user behavior
   - ✅ Measure customer engagement
   - ✅ Get to know your customers
5. Click **"Create"**
6. Accept the Terms of Service

### 3. Set Up Data Stream

1. Choose platform: **Web**
2. Enter website details:
   - **Website URL**: `https://ligadeals-berlin.com`
   - **Stream Name**: "LigaDeals Berlin Web"
3. **Enhanced measurement** should be enabled by default (recommended):
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads
4. Click **"Create stream"**

### 4. Get Your Measurement ID

After creating the data stream, you'll see your **Measurement ID** at the top right.

- **Format**: `G-XXXXXXXXXX`
- **Example**: `G-ABC123DEF4`

📋 **Copy this ID** - you'll need it for configuration!

### 5. Configure Environment Variables

Open your `.env.local` file and add your Measurement ID:

```env
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 6. Deploy to Production

For your analytics to work in production:

1. Add the environment variable to your hosting platform (Vercel, Netlify, etc.)
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your Measurement ID
3. Deploy your site

**Note**: Analytics only loads in production by default. To test in development, add:

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Available Tracking Events

The project includes comprehensive event tracking:

### 1. Contact Form Submission
```typescript
import { trackContactFormSubmission } from '@/lib/analytics/events';

trackContactFormSubmission({
  form_name: 'Contact Form',
  method: 'contact_form',
  success: true,
});
```

### 2. Article View
```typescript
import { trackArticleView } from '@/lib/analytics/events';

trackArticleView({
  article_title: 'טיפים לחיים בברלין',
  article_category: 'מדריכים',
  article_author: 'יוסי כהן',
  article_id: '123',
});
```

### 3. WhatsApp Click
```typescript
import { trackWhatsAppClick } from '@/lib/analytics/events';

trackWhatsAppClick({
  source_page: '/contact',
  button_location: 'floating',
});
```

### 4. Gallery Interaction
```typescript
import { trackGalleryInteraction } from '@/lib/analytics/events';

trackGalleryInteraction({
  gallery_type: 'photos',
  action: 'view',
  item_id: 'photo-123',
  item_title: 'ברלין בלילה',
});
```

### 5. Newsletter Signup
```typescript
import { trackNewsletterSignup } from '@/lib/analytics/events';

trackNewsletterSignup({
  source_page: '/blog',
  location: 'footer',
});
```

### 6. Search
```typescript
import { trackSearch } from '@/lib/analytics/events';

trackSearch({
  search_term: 'דירות בברלין',
  search_results: 15,
});
```

### 7. Social Share
```typescript
import { trackSocialShare } from '@/lib/analytics/events';

trackSocialShare({
  platform: 'facebook',
  content_type: 'article',
  content_id: 'article-123',
  content_title: 'מדריך לברלין',
});
```

### 8. Video Play
```typescript
import { trackVideoPlay } from '@/lib/analytics/events';

trackVideoPlay({
  video_title: 'סיור בברלין',
  video_id: 'video-123',
  video_provider: 'youtube',
});
```

### 9. Custom Events
```typescript
import { trackCustomEvent } from '@/lib/analytics/events';

trackCustomEvent('custom_action', {
  category: 'engagement',
  label: 'Custom Label',
  value: 100,
});
```

## GDPR Compliance & Consent Mode

The Analytics component is GDPR compliant by default with:

- ✅ IP Anonymization enabled
- ✅ Secure cookies (SameSite=None;Secure)
- ✅ Consent mode ready

### Implementing Consent Banner

If you need to implement a cookie consent banner:

```typescript
import { updateConsent } from '@/components/Analytics';

// When user accepts analytics cookies
updateConsent({
  analytics: true,
  marketing: false,
});
```

## Viewing Your Analytics Data

### Real-Time Reports
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Click **"Reports"** → **"Realtime"**
4. See live users, page views, and events

### Standard Reports
- **Life cycle** → **Acquisition**: Where users come from
- **Life cycle** → **Engagement**: What users do on your site
- **User** → **Demographics**: Age, gender, location
- **Events**: All tracked events and conversions

### Custom Events
- Go to **"Configure"** → **"Events"**
- See all custom events being tracked
- Create conversions from events

## Setting Up Conversions

Mark important events as conversions:

1. Go to **"Configure"** → **"Events"**
2. Find your event (e.g., `contact_form_submission`)
3. Toggle **"Mark as conversion"** on
4. These will now appear in conversion reports

## Recommended Conversions to Track

- ✅ `contact_form_submission`
- ✅ `newsletter_signup`
- ✅ `whatsapp_click`
- ✅ `article_view` (for popular content)

## Testing Your Analytics

### 1. Using Real-Time Reports

1. Enable analytics in development:
   ```env
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```
2. Start your dev server: `npm run dev`
3. Open [analytics.google.com](https://analytics.google.com)
4. Navigate to **Reports** → **Realtime**
5. Browse your local site and watch events appear

### 2. Using Browser DevTools

1. Open your site in Chrome
2. Open DevTools (F12)
3. Go to **Network** tab
4. Filter by "collect" or "google-analytics"
5. Interact with your site and see GA requests

### 3. Using GA Debug Mode

Add to your browser console:
```javascript
window.gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
```

## Privacy Best Practices

✅ **Implemented automatically:**
- IP anonymization
- Secure cookies
- No personally identifiable information (PII)
- Consent mode support

❌ **Never track:**
- User emails or names
- Passwords or sensitive data
- Credit card information
- Personal identification numbers

## Troubleshooting

### Analytics Not Loading

1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Verify you're in production (or `NEXT_PUBLIC_ENABLE_ANALYTICS=true`)
3. Check browser console for errors
4. Verify the Measurement ID format (G-XXXXXXXXXX)

### Events Not Appearing

1. Wait 24-48 hours for events to appear in standard reports
2. Check Real-Time reports for immediate feedback
3. Verify event names match exactly
4. Check browser console for "gtag" errors

### Multiple Properties

If you see duplicate data:
1. Remove any old Google Analytics code
2. Ensure only one Measurement ID is configured
3. Clear browser cache

## Performance Impact

The Analytics component:
- ✅ Loads asynchronously (`strategy="afterInteractive"`)
- ✅ Doesn't block page rendering
- ✅ Minimal performance impact (<50KB)
- ✅ Only loads in production (configurable)

## Data Retention

Configure data retention:
1. Go to **Admin** → **Data Settings** → **Data Retention**
2. Choose retention period:
   - 2 months (default)
   - 14 months (recommended)
   - 26 months
   - 38 months
   - 50 months

## Advanced Features

### User ID Tracking (for logged-in users)
```typescript
import { setUserId } from '@/lib/analytics/events';

setUserId('user-12345');
```

### User Properties
```typescript
import { setUserProperties } from '@/lib/analytics/events';

setUserProperties({
  user_type: 'premium',
  preferred_language: 'hebrew',
});
```

### Cross-Domain Tracking
If you have multiple domains, configure in GA4:
1. Go to **Admin** → **Data Streams** → **Web**
2. Click **"Configure tag settings"**
3. Click **"Configure your domains"**
4. Add your domains

## Resources

- **GA4 Documentation**: [support.google.com/analytics](https://support.google.com/analytics/answer/10089681)
- **GA4 Event Reference**: [developers.google.com/analytics/devguides/collection/ga4/events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- **Privacy & GDPR**: [support.google.com/analytics/topic/2919631](https://support.google.com/analytics/topic/2919631)

## Support

Need help with Google Analytics?
- **Google Analytics Help Center**: [support.google.com/analytics](https://support.google.com/analytics)
- **Google Analytics Community**: [support.google.com/analytics/community](https://support.google.com/analytics/community)

---

**Ready to Track!** 🚀

Once configured, your analytics will automatically track page views, and you can use the event tracking functions throughout your code to measure user engagement.

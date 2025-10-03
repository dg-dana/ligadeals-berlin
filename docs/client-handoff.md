# Client Handoff Documentation

## Welcome to Your New Website! 🎉

This document contains everything you need to manage and maintain your website effectively.

---

## Quick Start Guide

### Your Website
- **Live Site**: https://yourdomain.com
- **CMS (Sanity Studio)**: https://your-studio.sanity.studio
- **Hosting**: Vercel
- **Images**: Cloudinary

### First Steps
1. Log into Sanity Studio (see credentials below)
2. Explore the dashboard and content types
3. Try creating a draft article (don't publish yet)
4. Review the maintenance guide
5. Test the contact form by sending yourself a message

---

## Access & Credentials

### Important: Store Securely
**Save all credentials in a password manager like 1Password, LastPass, or Bitwarden.**

### Sanity Studio Access
- **URL**: https://your-studio.sanity.studio
- **Email**: [client-email@domain.com]
- **Password**: [Provided separately via secure channel]
- **Two-Factor Auth**: Recommended - enable in Settings

### Vercel Dashboard
- **URL**: https://vercel.com/dashboard
- **Email**: [client-email@domain.com]
- **Password**: [Provided separately]
- **Purpose**: View deployments, analytics, and logs

### Cloudinary Dashboard
- **URL**: https://cloudinary.com/console
- **Email**: [client-email@domain.com]
- **Password**: [Provided separately]
- **Purpose**: Manage images and media library

### Domain Registrar
- **Provider**: [e.g., GoDaddy, Namecheap, Google Domains]
- **URL**: [registrar-url]
- **Email**: [client-email@domain.com]
- **Password**: [Provided separately]

### Email Service (if applicable)
- **Provider**: [e.g., SendGrid, Mailgun]
- **URL**: [service-url]
- **Email**: [client-email@domain.com]
- **API Key**: [Stored in Vercel environment variables]

### Google Services
- **Google Analytics**: analytics.google.com
- **Search Console**: search.google.com/search-console
- **Email**: [client-email@domain.com]
- **Access**: [Provided separately]

### GitHub Repository (Optional)
- **URL**: https://github.com/yourusername/your-repo
- **Access**: View-only access provided
- **Purpose**: View code, report issues

---

## Content Management Training

### How to Add a New Article

#### Step 1: Access Sanity Studio
1. Go to: https://your-studio.sanity.studio
2. Log in with your credentials
3. Click "Articles" in the sidebar

#### Step 2: Create New Article
1. Click "+ Create new article"
2. Fill in the form:

**Required Fields:**
- **Title (Hebrew)**: כותרת המאמר
- **Title (English)**: Article Title
- **Slug**: URL-friendly name (auto-generated)
  - Example: "my-first-article"
  - Will become: yourdomain.com/articles/my-first-article

#### Step 3: Add Main Image
1. Click "Upload" in the Main Image field
2. Select image from your computer
3. Wait for upload to complete
4. Add alt text (description for accessibility)
   - Example: "Photo of Tel Aviv sunset"

**Image Requirements:**
- Minimum size: 1200 x 630 pixels
- Format: JPG or PNG
- Maximum file size: 5MB (will be optimized)

#### Step 4: Write Content
Use the rich text editor to write your article:

**Formatting Options:**
- **Headings**: Use for sections (H2, H3)
- **Bold**: Highlight important text
- **Italic**: Emphasize words
- **Lists**: Bullet points or numbered lists
- **Links**: Add links to other pages or external sites
- **Images**: Insert images within text
- **Quotes**: Add block quotes

**Writing Tips:**
- Start with an engaging opening
- Use short paragraphs (3-4 sentences)
- Add subheadings every 2-3 paragraphs
- Include images to break up text
- End with a conclusion or call-to-action

#### Step 5: Add Metadata
- **Excerpt**: Brief summary (1-2 sentences)
  - Shows on article preview cards
  - Used for search results
- **Category**: Choose or create category
- **Author**: Select author from dropdown
- **Publication Date**: When to publish
  - Set future date to schedule
- **Featured**: Toggle ON to show on homepage

#### Step 6: Preview & Publish
1. Click "Preview" to see how it looks
2. Check:
   - Hebrew text displays correctly (right-to-left)
   - Images load properly
   - Formatting looks good
3. If satisfied, click "Publish"
4. Wait 2-3 minutes for site to rebuild
5. Visit your site to see the new article

### How to Edit Existing Article

1. Go to Sanity Studio
2. Click "Articles"
3. Find the article you want to edit
4. Click to open it
5. Make your changes
6. Click "Save" (bottom right)
7. Site will update automatically

**Note**: Saving is different from Publishing:
- **Save**: Keeps changes as draft
- **Publish**: Makes changes live on website

### How to Delete an Article

1. Open the article in Sanity Studio
2. Click the "..." menu (top right)
3. Select "Delete"
4. Confirm deletion
5. Article removed from website after rebuild

---

## Managing Images

### Upload New Images

**In Article Content:**
1. Click where you want to insert image
2. Click image icon in editor toolbar
3. Click "Upload"
4. Select image
5. Add alt text and caption

**In Image Library:**
1. Go to Sanity Studio
2. Click "Assets" in sidebar
3. Click "Upload"
4. Drag and drop or select files
5. Images upload to Cloudinary automatically

### Image Best Practices

**Quality:**
- Use high-resolution images (at least 1200px wide)
- Save in JPG format for photos
- Save in PNG format for logos/graphics with transparency
- Keep file sizes under 2MB before upload

**Optimization:**
- Images are automatically optimized by Cloudinary
- No need to manually resize
- WebP format automatically served to supported browsers

**Accessibility:**
- Always add alt text to images
- Describe what's in the image
- Example: "Woman working on laptop in coffee shop"
- Not: "Image123.jpg" or "Photo"

### Replace an Image

1. Click on the existing image
2. Click "Replace"
3. Upload new image
4. Update alt text if needed
5. Save changes

---

## Responding to Inquiries

### Where Contact Form Submissions Go

When someone fills out your contact form:
- Email sent to: [your-email@domain.com]
- Subject line includes: "Contact Form Submission"
- Contains: Name, Email, Subject, Message

### Response Best Practices

**Timing:**
- Respond within 24 hours (1 business day)
- Set up auto-responder if on vacation

**Template for Initial Response:**
```
Subject: Re: [Their Subject]

Shalom [Name],

Thank you for reaching out through my website.

I received your message regarding [topic/question].

[Answer their question or acknowledge their inquiry]

I'll follow up with more details by [timeframe].

Feel free to reply if you have any other questions.

Best regards,
[Your Name]
```

**Follow-Up:**
- Keep track of inquiries in a spreadsheet or CRM
- Set reminders to follow up
- Close loop with final response

### Spam Handling

If you receive spam:
- Don't respond to obvious spam
- Mark as spam in your email
- Email addresses are obfuscated on the website
- Contact form has protection against bots

---

## Regular Maintenance

### Daily (5 minutes)
- Check email for contact form submissions
- Visit your website to ensure it's loading

### Weekly (30 minutes)
- Publish new article (if you have a content schedule)
- Respond to all inquiries
- Share new content on social media

### Monthly (1-2 hours)
- Review Google Analytics
  - See how many visitors
  - Which pages are popular
  - Where visitors come from
- Check for broken links
- Update outdated content
- Back up your content (see Backup section)

### Quarterly (3-4 hours)
- Full content review
- Update author bio and about page
- Refresh old articles with new information
- Check all images still load correctly
- Review and update SEO descriptions

---

## Understanding Your Analytics

### Google Analytics Dashboard

**Key Metrics to Watch:**
1. **Users**: How many people visited
2. **Sessions**: Total visits (people can visit multiple times)
3. **Pageviews**: Total pages viewed
4. **Bounce Rate**: % of people who left after viewing one page
   - Lower is better (under 70% is good)
5. **Session Duration**: How long people stay
   - Longer is better (2+ minutes is good)

### Vercel Analytics

Shows real-time performance:
- **Core Web Vitals**: Speed metrics
- **Traffic by Country**: Where visitors are from
- **Popular Pages**: Which pages get most views
- **Devices**: Desktop vs Mobile vs Tablet

**How to Access:**
1. Go to vercel.com/dashboard
2. Click your project
3. Click "Analytics" tab

---

## Backup Your Content

### Why Backups Matter
- Protect against accidental deletion
- Recover from technical issues
- Keep archives of old content
- Peace of mind

### Monthly Backup Process

#### Option 1: Sanity Studio Export
1. Contact your developer to run export
2. They'll send you a backup file
3. Store in Google Drive or Dropbox
4. Label with date: `backup-2025-01-15.tar.gz`

#### Option 2: Manual Content Save
1. Open each article in Sanity Studio
2. Copy the full text
3. Paste into Google Docs or Word
4. Save in organized folder structure
5. Download images separately

### What to Backup
- All published articles
- Draft articles
- Images (download from Cloudinary)
- Site settings
- Author profiles

### Where to Store Backups
- **Cloud Storage**: Google Drive, Dropbox, OneDrive
- **External Drive**: Keep offline copy
- **Multiple Locations**: Don't rely on just one place

---

## Troubleshooting Common Issues

### Website Won't Load

**Symptoms**: Error message, blank page, "Site not found"

**Solutions**:
1. Wait 5 minutes and try again
2. Try different browser
3. Try incognito/private mode
4. Check vercel.com/status
5. Contact support (see below)

### Changes Not Appearing

**Symptoms**: Updated content not showing on website

**Solutions**:
1. Wait 2-3 minutes for rebuild
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Check that content is published (not draft)
5. Trigger manual rebuild in Vercel

### Images Not Displaying

**Symptoms**: Broken image icons, alt text showing

**Solutions**:
1. Check image uploaded correctly in Sanity
2. Check Cloudinary dashboard for image
3. Try re-uploading image
4. Clear browser cache
5. Try different browser

### Can't Log Into Sanity Studio

**Symptoms**: Password incorrect, forgot password

**Solutions**:
1. Click "Forgot password?" link
2. Check email for reset link
3. Try different browser
4. Clear cookies
5. Contact Sanity support: support@sanity.io

### Contact Form Not Working

**Symptoms**: Form submits but no email received

**Solutions**:
1. Check spam/junk folder
2. Verify email address in settings
3. Test with different email address
4. Check Vercel logs (or contact developer)
5. Contact support (see below)

### Hebrew Text Displays Wrong

**Symptoms**: Text direction incorrect, broken characters

**Solutions**:
1. Try different browser
2. Check keyboard language settings
3. Copy-paste from working Hebrew text
4. Contact developer if persistent

---

## Support Contacts

### Your Developer
**Primary Contact for Website Issues**
- **Name**: [Developer Name]
- **Email**: [developer-email@domain.com]
- **Phone**: [phone-number]
- **Hours**: [availability]
- **Response Time**: [expected timeframe]

**Contact for:**
- Website not loading
- Technical errors
- Feature requests
- Code changes
- Training questions

### Vercel Support
**Hosting & Deployment Issues**
- **Email**: support@vercel.com
- **Website**: vercel.com/support
- **Docs**: vercel.com/docs
- **Discord**: vercel.com/discord

### Sanity Support
**CMS & Content Issues**
- **Email**: support@sanity.io
- **Website**: sanity.io/help
- **Docs**: sanity.io/docs
- **Slack**: sanity.io/slack

### Cloudinary Support
**Image & Media Issues**
- **Email**: support@cloudinary.com
- **Website**: support.cloudinary.com
- **Docs**: cloudinary.com/documentation

### Domain Registrar
**Domain & DNS Issues**
- **Provider**: [Registrar Name]
- **Support**: [support contact]
- **Dashboard**: [login URL]

---

## FAQs

### Can I customize the website design?

**Minor changes**: Update colors, fonts in Sanity settings
**Major changes**: Contact your developer for custom development

### How do I add a new page?

Contact your developer. New pages require code changes.

### Can I add more authors?

Yes! Go to Sanity Studio > Authors > Create new author

### How do I change my email address?

Contact your developer to update email settings in Vercel.

### Can I schedule articles to publish later?

Yes! Set the Publication Date to a future date when creating an article.

### How do I add videos?

Upload videos to YouTube/Vimeo, then embed the link in your article.

### Can I export my content?

Yes! Contact your developer to run a content export.

### How much traffic can my site handle?

Vercel can handle millions of visitors. No need to worry about traffic spikes.

### Is my site backed up automatically?

- **Content**: Yes, by Sanity
- **Code**: Yes, by GitHub
- **Images**: Yes, by Cloudinary
- **Recommended**: Still do monthly manual backups

### How do I improve SEO?

- Write quality content regularly
- Use descriptive titles
- Add meta descriptions
- Include relevant keywords naturally
- Add alt text to images
- Share on social media
- Get backlinks from other sites

---

## Training & Resources

### Video Tutorials
(To be recorded and added)
- How to add a new article
- How to upload and manage images
- How to respond to inquiries
- How to read analytics

### Documentation
- **This Document**: Overview and quick reference
- **Maintenance Guide**: Detailed procedures
- **Post-Launch Checklist**: Verification steps
- **Deployment Guide**: Technical reference

### Learning Resources
- [Sanity Studio Basics](https://www.sanity.io/docs/sanity-studio)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)
- [Google Analytics for Beginners](https://analytics.google.com/analytics/academy/)

### Scheduled Training Sessions
- **Initial Training**: [Date/Time]
- **Follow-Up Session**: [Date/Time]
- **Monthly Check-In**: [Schedule]

---

## Service & Maintenance Plan

### What's Included
- **Hosting**: Vercel Pro plan (or applicable tier)
- **CMS**: Sanity Growth plan (or applicable tier)
- **Images**: Cloudinary Free/Plus plan
- **Domain**: Annual renewal [date]
- **SSL Certificate**: Auto-renewed by Vercel
- **Support**: [Developer support plan details]

### Renewal Dates
- **Domain**: [Renewal date] - Auto-renew: Yes/No
- **Hosting**: [Billing cycle] - $[amount]/[period]
- **CMS**: [Billing cycle] - $[amount]/[period]
- **Images**: [Billing cycle] - $[amount]/[period]

### Upgrade Options
- More articles per month
- Additional authors
- Custom features
- Enhanced analytics
- Priority support

---

## Next Steps

### Week 1
- [ ] Log into all services
- [ ] Change temporary passwords
- [ ] Enable two-factor authentication
- [ ] Create your first draft article
- [ ] Send yourself a test contact form
- [ ] Review this documentation

### Week 2
- [ ] Publish your first article
- [ ] Share on social media
- [ ] Monitor analytics
- [ ] Respond to any inquiries
- [ ] Schedule next article

### Month 1
- [ ] Publish 2-4 articles
- [ ] Review analytics trends
- [ ] Back up content
- [ ] Schedule training follow-up
- [ ] Plan content calendar

---

## Important Reminders

### Security
- Never share passwords via email
- Use strong, unique passwords
- Enable two-factor authentication
- Log out when using shared computers
- Update passwords quarterly

### Content Best Practices
- Publish regularly (weekly or bi-weekly)
- Keep content relevant and updated
- Respond to inquiries promptly
- Back up content monthly
- Monitor analytics for insights

### When to Contact Developer
- Technical errors or bugs
- Need new features or pages
- Questions about functionality
- Performance issues
- Security concerns

---

## Conclusion

You now have all the tools and knowledge to successfully manage your website!

### Remember:
1. **Content is Key**: Regular, quality content keeps visitors coming back
2. **Respond Promptly**: Quick responses build trust
3. **Monitor Regularly**: Check analytics and performance
4. **Back Up Often**: Protect your hard work
5. **Ask for Help**: Don't hesitate to contact support

### Congratulations on Your New Website! 🚀

---

**Document Version**: 1.0
**Last Updated**: [Date]
**Next Review**: [Date + 3 months]

For questions about this document, contact: [developer-email@domain.com]

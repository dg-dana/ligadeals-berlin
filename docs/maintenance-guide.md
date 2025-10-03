# Website Maintenance Guide

## Table of Contents
1. [Content Management](#content-management)
2. [Adding New Articles](#adding-new-articles)
3. [Updating Images](#updating-images)
4. [Managing Inquiries](#managing-inquiries)
5. [Regular Maintenance Tasks](#regular-maintenance-tasks)
6. [Backup Strategy](#backup-strategy)
7. [Troubleshooting](#troubleshooting)

---

## Content Management

### Accessing Sanity Studio

1. Navigate to: `https://your-studio-subdomain.sanity.studio`
2. Log in with your credentials
3. You'll see the main dashboard with content types

### Content Types Available

**Articles (Posts)**
- Title (English & Hebrew)
- Slug (URL-friendly name)
- Main Image
- Content (Rich text editor)
- Excerpt/Summary
- Category
- Author
- Publication Date
- Featured toggle

**Site Settings**
- Site name
- Tagline
- Contact email
- Social media links
- SEO defaults

---

## Adding New Articles

### Step-by-Step Process

#### 1. Create New Article
1. Click "Articles" in the left sidebar
2. Click "+ Create new article" button
3. Fill in required fields:
   - **Title** (Hebrew & English)
   - **Slug** (auto-generated, can edit)
   - **Main Image** (see image upload below)
   - **Content** (use rich text editor)
   - **Excerpt** (brief summary, 1-2 sentences)

#### 2. Add Content
The rich text editor supports:
- **Headings**: H1, H2, H3, H4
- **Text formatting**: Bold, Italic, Underline
- **Lists**: Bulleted and numbered
- **Links**: Internal and external
- **Images**: Inline images
- **Quotes**: Block quotes
- **Code blocks**: For technical content

**Rich Text Editor Tips:**
```
- Use H2 for main sections
- Use H3 for subsections
- Keep paragraphs short (3-4 sentences)
- Add images every 2-3 paragraphs
- Use lists for better readability
- Bold important terms
- Add alt text to all images
```

#### 3. Upload Main Image
1. Click "Upload" in image field
2. Select image from computer
3. Image will auto-upload to Cloudinary
4. Add alt text (describe image for accessibility)
5. Add caption (optional)

**Image Guidelines:**
- Minimum size: 1200x630px
- Format: JPG or PNG
- File size: Under 500KB (will be optimized)
- Aspect ratio: 16:9 or 4:3 preferred

#### 4. Set Metadata
- **Category**: Choose from existing or create new
- **Author**: Select author from list
- **Publication Date**: Set publish date/time
- **Featured**: Toggle ON to show on homepage

#### 5. Preview & Publish
1. Click "Preview" to see how it looks
2. Check Hebrew text direction (RTL)
3. Verify images display correctly
4. Click "Publish" when ready
5. Site will rebuild automatically (2-3 minutes)

### Article Checklist
- [ ] Title in Hebrew and English
- [ ] Unique slug (URL)
- [ ] Main image uploaded with alt text
- [ ] Content written and formatted
- [ ] Excerpt/summary added
- [ ] Category selected
- [ ] Author assigned
- [ ] Publication date set
- [ ] Previewed before publishing
- [ ] Published and verified on live site

---

## Updating Images

### Using Cloudinary for Images

#### Upload New Images
1. Go to Sanity Studio
2. In any image field, click "Upload"
3. Select image from computer
4. Wait for upload confirmation
5. Add alt text (required for accessibility)

#### Replace Existing Images
1. Click on existing image
2. Click "Replace" button
3. Upload new image
4. Update alt text if needed
5. Save changes

#### Image Optimization Tips
- Images are automatically optimized by Cloudinary
- WebP format served to supported browsers
- Responsive sizes generated automatically
- Lazy loading enabled by default

#### Image Best Practices
```
Type            | Size       | Format | Use Case
----------------|------------|--------|------------------
Article Hero    | 1200x630   | JPG    | Main article image
Inline Image    | 800x600    | JPG    | Content images
Thumbnail       | 400x300    | JPG    | Article preview
Logo/Icon       | 200x200    | PNG    | Logos with transparency
```

### Managing Image Library
- Delete unused images to save storage
- Use descriptive filenames
- Tag images for easy searching
- Keep original high-res versions backed up locally

---

## Managing Inquiries

### Contact Form Submissions

Contact form emails are sent to: `your-email@domain.com`

#### Email Contains:
- **Name**: Sender's name
- **Email**: Reply-to address
- **Subject**: Inquiry subject
- **Message**: Full message text
- **Timestamp**: When submitted
- **Page**: Which page they submitted from

### Response Process

#### 1. Acknowledge Receipt (Within 24 hours)
```
Subject: Re: [Original Subject]

Shalom [Name],

Thank you for reaching out. I received your message regarding [topic].

[Personalized response]

I will get back to you with more details within [timeframe].

Best regards,
[Your name]
```

#### 2. Provide Detailed Response
- Address all questions
- Provide relevant links/resources
- Include call-to-action if applicable
- Set expectations for next steps

#### 3. Follow Up
- Track inquiries in spreadsheet/CRM
- Follow up if no response in 1 week
- Archive resolved inquiries

### Spam Prevention
- Contact form includes honeypot field
- Rate limiting prevents abuse
- Monitor for suspicious submissions
- Block abusive IPs if needed

---

## Regular Maintenance Tasks

### Daily Tasks (5 minutes)
- [ ] Check for new contact form submissions
- [ ] Monitor website availability (visit homepage)
- [ ] Respond to urgent inquiries

### Weekly Tasks (30 minutes)
- [ ] Publish new article (if scheduled)
- [ ] Review analytics for traffic trends
- [ ] Check for broken links (use link checker)
- [ ] Respond to all pending inquiries
- [ ] Update social media with new content

### Monthly Tasks (2 hours)

#### Content Review
- [ ] Review and update outdated articles
- [ ] Check all images loading correctly
- [ ] Remove or update expired content
- [ ] Review and respond to comments (if enabled)

#### Technical Maintenance
- [ ] Check Vercel deployment logs for errors
- [ ] Review performance metrics
- [ ] Check Core Web Vitals in Search Console
- [ ] Update dependencies (if needed)
- [ ] Review security alerts

#### SEO & Analytics
- [ ] Review Google Analytics report
- [ ] Check Search Console for crawl errors
- [ ] Monitor keyword rankings
- [ ] Update meta descriptions if needed
- [ ] Submit new pages to Search Console

### Quarterly Tasks (4 hours)

#### Content Audit
- [ ] Full content inventory
- [ ] Update author bios
- [ ] Refresh evergreen content
- [ ] Archive very old articles
- [ ] Plan content calendar for next quarter

#### Technical Audit
- [ ] Run full Lighthouse audit
- [ ] Test on all major browsers
- [ ] Test on multiple devices
- [ ] Review accessibility compliance
- [ ] Update SSL certificate (if not auto-renewed)

#### Backup & Security
- [ ] Full content backup (see below)
- [ ] Export all images from Cloudinary
- [ ] Review user access and permissions
- [ ] Update passwords
- [ ] Review security headers

---

## Backup Strategy

### Automated Backups

#### Sanity Content
Sanity automatically backs up your content, but it's good to have local copies:

**Export Content (Monthly)**
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Export dataset
sanity dataset export production backup-YYYY-MM-DD.tar.gz
```

Store exports in:
- Google Drive / Dropbox
- External hard drive
- AWS S3 / Cloud storage

#### Image Backups
1. Go to Cloudinary dashboard
2. Download media library export
3. Store in multiple locations
4. Keep original high-res versions

### Manual Backups

#### Website Code
```bash
# Clone repository
git clone https://github.com/yourusername/your-repo.git

# Create backup branch
git checkout -b backup-YYYY-MM-DD
git push origin backup-YYYY-MM-DD
```

#### Environment Variables
Document all environment variables in a secure location:
- Sanity API tokens
- Cloudinary credentials
- Email service credentials
- Analytics IDs

**Store in:**
- Password manager (1Password, LastPass)
- Encrypted document
- Secure note in cloud storage

### Disaster Recovery Plan

#### If Site Goes Down
1. Check Vercel status: vercel.com/status
2. Review deployment logs in Vercel dashboard
3. Rollback to previous deployment
4. Contact Vercel support if needed

#### If Content Lost
1. Access Sanity revision history
2. Restore from local backup
3. Re-import using Sanity CLI:
```bash
sanity dataset import backup-YYYY-MM-DD.tar.gz production
```

#### If Domain Issues
1. Check domain registrar
2. Verify DNS settings
3. Check SSL certificate status
4. Contact domain support

---

## Troubleshooting

### Common Issues

#### Images Not Displaying
**Symptoms:** Broken image icons, alt text showing
**Solutions:**
1. Check Cloudinary dashboard - is account active?
2. Verify image URLs in Sanity
3. Check CORS settings in Cloudinary
4. Clear browser cache and retry
5. Check network tab in browser DevTools

#### Content Not Updating
**Symptoms:** Changes in Sanity not appearing on site
**Solutions:**
1. Check webhook is configured in Sanity
2. Trigger manual rebuild in Vercel
3. Check deployment logs for errors
4. Verify content is published (not draft)
5. Clear CDN cache in Vercel

#### Contact Form Not Working
**Symptoms:** Form submits but no email received
**Solutions:**
1. Check spam folder
2. Verify email configuration in Vercel
3. Check SendGrid/email service status
4. Test form with different email address
5. Review server logs for errors

#### Slow Page Load
**Symptoms:** Pages taking >3 seconds to load
**Solutions:**
1. Run Lighthouse audit to identify issues
2. Optimize large images in Cloudinary
3. Check for blocking JavaScript
4. Review Core Web Vitals
5. Check Vercel analytics for bottlenecks

#### Hebrew Text Display Issues
**Symptoms:** Text direction wrong, characters broken
**Solutions:**
1. Verify RTL CSS is loading
2. Check font files are accessible
3. Test in different browsers
4. Verify Unicode encoding (UTF-8)
5. Check for CSS conflicts

#### SSL Certificate Errors
**Symptoms:** "Not secure" warning, certificate invalid
**Solutions:**
1. Verify domain DNS settings
2. Check Vercel SSL configuration
3. Force SSL renewal in Vercel
4. Contact Vercel support
5. Check for mixed content (HTTP in HTTPS page)

### Getting Help

#### Vercel Support
- Email: support@vercel.com
- Documentation: vercel.com/docs
- Discord: vercel.com/discord

#### Sanity Support
- Email: support@sanity.io
- Documentation: sanity.io/docs
- Slack community: sanity.io/slack

#### Cloudinary Support
- Email: support@cloudinary.com
- Documentation: cloudinary.com/documentation
- Support portal: support.cloudinary.com

#### Developer Contact
- Email: [developer-email]
- Phone: [developer-phone]
- GitHub Issues: [repo-url]/issues

### Emergency Procedures

#### Site Completely Down
1. **Immediate**: Tweet/post status update
2. **Check**: Vercel status page
3. **Review**: Last deployment logs
4. **Action**: Rollback to last working deployment
5. **Notify**: Stakeholders and users
6. **Investigate**: Root cause
7. **Document**: Incident and resolution

#### Data Loss/Corruption
1. **Immediate**: Stop all editing
2. **Assess**: Extent of data loss
3. **Restore**: From most recent backup
4. **Verify**: All content restored correctly
5. **Investigate**: How it happened
6. **Prevent**: Implement safeguards

#### Security Breach
1. **Immediate**: Change all passwords
2. **Revoke**: API keys and tokens
3. **Review**: Access logs
4. **Notify**: Affected users (if applicable)
5. **Audit**: Security measures
6. **Implement**: Enhanced security

---

## Maintenance Calendar

### Sample Monthly Schedule

**Week 1**
- Monday: Review analytics
- Wednesday: Publish new article
- Friday: Check backups

**Week 2**
- Monday: Update old articles
- Wednesday: Image optimization review
- Friday: Test contact form

**Week 3**
- Monday: SEO audit
- Wednesday: Publish new article
- Friday: Browser compatibility check

**Week 4**
- Monday: Security review
- Wednesday: Performance audit
- Friday: Full backup

---

## Resources & Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

### Tools
- [Google Analytics](https://analytics.google.com)
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org)

### Learning Resources
- [Web.dev](https://web.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Sanity Learn](https://www.sanity.io/learn)

---

## Notes
Keep this guide updated with:
- New procedures discovered
- Solutions to unique problems
- Changes in tools/services
- Lessons learned from issues

Last Updated: [Date]
Version: 1.0

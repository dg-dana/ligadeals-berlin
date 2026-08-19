# 📚 Traveliga - Documentation

Welcome to the Traveliga documentation!

## 🚀 Deployment Guides

### For Quick Deployment
**Start here if you want to deploy quickly:**
- **[Quick Start Deployment Guide](DEPLOYMENT_QUICK_START.md)** (Hebrew)
  - Step-by-step instructions with exact commands
  - Screenshots and examples
  - Troubleshooting for common issues
  - Estimated time: 30-60 minutes

### For Detailed Reference
**Comprehensive deployment documentation:**
- **[Full Deployment Guide](deployment-guide.md)** (Hebrew)
  - In-depth explanations
  - Advanced configuration options
  - Security best practices
  - Post-deployment checklist
  - Maintenance procedures

## 🔧 Pre-Deployment

Before deploying, run the verification script:

```bash
npm run verify:deployment
```

This will check:
- ✅ All required environment variables are set
- ✅ Required files exist
- ✅ Security configurations are in place
- ✅ Git is properly configured
- ✅ Package scripts are available

## 📋 Quick Reference

### Environment Variables Required

| Variable | Service | Required | Where to Get |
|----------|---------|----------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity | ✅ Yes | [Sanity Dashboard](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity | ✅ Yes | Usually `production` |
| `SANITY_API_TOKEN` | Sanity | ✅ Yes | Sanity → API → Tokens |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary | ✅ Yes | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary | ✅ Yes | Cloudinary Console |
| `CLOUDINARY_API_SECRET` | Cloudinary | ✅ Yes | Cloudinary Console |
| `RESEND_API_KEY` | Resend | ✅ Yes | [Resend Dashboard](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Resend | ✅ Yes | Your verified email |
| `CONTACT_EMAIL` | Email | ✅ Yes | Where to receive messages |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | ⚠️ Optional | [Google Analytics](https://analytics.google.com) |

### Deployment Platforms

#### Vercel (Recommended) ⭐
- **Free tier**: Perfect for this project
- **Automatic HTTPS**: SSL certificates included
- **GitHub integration**: Auto-deploy on push
- **Edge network**: Fast worldwide
- **Easy custom domains**: Simple DNS setup

**Steps:**
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

See [Quick Start Guide](DEPLOYMENT_QUICK_START.md) for details.

#### Other Platforms
The project can also be deployed to:
- **Netlify**: Similar to Vercel
- **Railway**: Node.js hosting
- **DigitalOcean App Platform**: More control
- **AWS Amplify**: Amazon's platform

## 🔐 Security Checklist

Before going live, ensure:

- [ ] All `.env` files are in `.gitignore`
- [ ] No API keys committed to Git
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Security headers configured (in `next.config.ts`)
- [ ] Rate limiting enabled (in `middleware.ts`)
- [ ] CORS properly configured
- [ ] Sanity webhook uses secret validation
- [ ] Contact form has validation and spam protection

## 🧪 Testing After Deployment

### Functional Tests
```bash
# Test the deployed site
curl https://your-site.vercel.app

# Test API routes
curl -X POST https://your-site.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### Performance Tests
- **Lighthouse**: Chrome DevTools → Lighthouse
- **PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **GTmetrix**: [gtmetrix.com](https://gtmetrix.com)

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Manual Testing
- [ ] Homepage loads correctly
- [ ] Deal pages display properly
- [ ] Search and filters work
- [ ] Contact form sends emails
- [ ] Images load from Cloudinary
- [ ] Mobile responsive design works
- [ ] RTL (Hebrew) displays correctly
- [ ] Analytics tracking works

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails on Vercel
**Error**: `Module not found` or `Type error`

**Solution**:
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version matches
# - Clear Vercel build cache
# - Check all dependencies are in package.json
```

#### 2. Environment Variables Not Working
**Error**: API returns 500 or undefined values

**Solution**:
- Vercel → Settings → Environment Variables
- Make sure all variables are set for "Production"
- Redeploy after adding variables

#### 3. Webhook Not Updating Content
**Error**: Changes in Sanity don't appear on site

**Solution**:
- Check Sanity → API → Webhooks → Deliveries
- Look for failed requests (not 200 OK)
- Verify `SANITY_WEBHOOK_SECRET` matches in both places
- Check webhook URL is correct

#### 4. Images Not Loading
**Error**: Broken image icons or 404s

**Solution**:
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Check Cloudinary Dashboard for images
- Ensure `next.config.ts` has Cloudinary domain

#### 5. Emails Not Sending
**Error**: Contact form submits but no email received

**Solution**:
- Verify domain in [Resend Dashboard](https://resend.com/domains)
- Check DNS records for domain verification
- Look at Vercel Function logs for errors
- Test with Resend's email testing tool

## 📞 Getting Help

### Documentation
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Sanity**: [sanity.io/docs](https://sanity.io/docs)
- **Cloudinary**: [cloudinary.com/documentation](https://cloudinary.com/documentation)

### Community Support
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Next.js Discussions**: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)
- **Sanity Slack**: [slack.sanity.io](https://slack.sanity.io)

### Project-Specific Help
- Open an issue in your GitHub repository
- Check the troubleshooting sections in the guides
- Review Vercel deployment logs

## 📈 Post-Deployment

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sanity Insights**: Content usage analytics
- **Uptime monitoring**: [UptimeRobot](https://uptimerobot.com) (free)

### Maintenance
- **Update dependencies**: Monthly `npm update`
- **Security audits**: `npm audit` regularly
- **Content backups**: Export Sanity data periodically
- **Performance reviews**: Check Lighthouse scores monthly

### Content Updates
1. **Log in to Sanity Studio**: `https://your-project.sanity.studio`
2. **Add/Edit content**: Deals, categories, testimonials
3. **Publish**: Changes appear on site within 10 seconds (via webhook)

## 🎯 Next Steps After Deployment

1. **Add Content**
   - Create real deals in Sanity
   - Upload high-quality images to Cloudinary
   - Add categories and testimonials

2. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Add meta descriptions to all pages
   - Optimize images with alt text

3. **Marketing**
   - Share on social media
   - Create Facebook/Instagram pages
   - Engage with Berlin community groups

4. **Analytics**
   - Set up Google Analytics goals
   - Track popular deals
   - Monitor user behavior

5. **Continuous Improvement**
   - Gather user feedback
   - Add new features based on needs
   - Optimize based on analytics data

---

**Happy Deploying! 🚀**

If you need help, start with the [Quick Start Guide](DEPLOYMENT_QUICK_START.md) or check the [Troubleshooting section](#-troubleshooting).

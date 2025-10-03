# Performance Checklist - Liga Deals Berlin

## Target Performance Scores

| Metric | Desktop Target | Mobile Target | Priority |
|--------|---------------|---------------|----------|
| Performance | ≥90 | ≥85 | 🔴 Critical |
| Accessibility | ≥95 | ≥95 | 🔴 Critical |
| Best Practices | ≥85 | ≥85 | 🟡 Important |
| SEO | ≥95 | ≥95 | 🔴 Critical |

## Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **FID (First Input Delay)**: ≤ 100ms
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **FCP (First Contentful Paint)**: ≤ 1.8s
- **TTI (Time to Interactive)**: ≤ 3.8s

---

## ✅ Implemented Optimizations

### 1. Image Optimization
- ✅ **Next.js Image Component**: Using `next/image` for automatic optimization
- ✅ **Cloudinary Integration**: Set up for advanced image processing and CDN delivery
- ✅ **Responsive Images**: Automatic srcset generation for different screen sizes
- ✅ **Lazy Loading**: Images load only when entering viewport
- ✅ **WebP Format**: Modern image formats with fallbacks
- ✅ **Proper Sizing**: Width and height attributes prevent layout shift

**Implementation:**
- All images use `<Image>` from `next/image`
- Cloudinary configured in `lib/cloudinary.ts`
- Quality settings optimized (80% default)

### 2. Code Splitting & Lazy Loading
- ✅ **Dynamic Imports**: Below-the-fold components lazy loaded
- ✅ **Route-based Splitting**: Automatic with Next.js
- ✅ **Component-level Splitting**: Manual dynamic imports for heavy components

**Implementation:**
```typescript
// app/page.tsx
const FeaturedSection = dynamic(() => import('@/components/home/FeaturedSection'))
const AboutPreview = dynamic(() => import('@/components/home/AboutPreview'))
const ContactPreview = dynamic(() => import('@/components/home/ContactPreview'))
```

### 3. Font Optimization
- ✅ **Google Fonts Optimization**: Using Next.js font optimization
- ✅ **Hebrew Font Support**: Heebo and Assistant fonts with Hebrew subset
- ✅ **Font Display Swap**: Prevents invisible text during load
- ✅ **Font Preloading**: Critical fonts preloaded
- ✅ **System Font Fallbacks**: Prevents layout shift

**Implementation:**
```typescript
// app/layout.tsx
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})
```

### 4. JavaScript Optimization
- ✅ **Tree Shaking**: Unused code eliminated in production build
- ✅ **Minification**: Automatic with Next.js build
- ✅ **Code Compression**: Gzip and Brotli enabled
- ✅ **Module Splitting**: Vendor and app bundles separated
- ✅ **React Server Components**: Where applicable for reduced JS bundle

### 5. CSS Optimization
- ✅ **Tailwind CSS Purging**: Unused classes removed in production
- ✅ **Critical CSS**: Inline critical styles
- ✅ **CSS Minification**: Automatic with build process
- ✅ **Dark Mode Optimization**: CSS variables for theme switching

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // Ensures unused classes are purged
}
```

### 6. Network Optimization
- ✅ **Static Asset Caching**: Configured via Next.js
- ✅ **CDN Integration**: Cloudinary for images, Vercel CDN for static assets
- ✅ **HTTP/2 Support**: Enabled by default on modern hosts
- ✅ **Resource Hints**: DNS prefetch, preconnect for external resources

### 7. SEO Optimization
- ✅ **Metadata Configuration**: Complete meta tags for all pages
- ✅ **Structured Data**: Schema.org markup for Organization and Website
- ✅ **Sitemap**: Auto-generated
- ✅ **Robots.txt**: Configured for crawlers
- ✅ **Semantic HTML**: Proper heading hierarchy and ARIA labels
- ✅ **Hebrew Language Support**: lang="he" and dir="rtl" attributes

**Implementation:**
- See `lib/seo/metadata.ts` for metadata utilities
- See `lib/seo/structured-data.ts` for JSON-LD schemas

### 8. Accessibility
- ✅ **ARIA Labels**: All interactive elements labeled
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Color Contrast**: WCAG AA compliant (minimum 4.5:1)
- ✅ **Screen Reader Support**: Semantic HTML and ARIA roles
- ✅ **RTL Support**: Proper right-to-left layout for Hebrew

### 9. Performance Monitoring
- ✅ **Google Analytics 4**: Comprehensive event tracking
- ✅ **Core Web Vitals Tracking**: Automated metrics collection
- ✅ **Error Tracking**: Custom error boundaries
- ✅ **Lighthouse CI**: Automated performance testing

**Scripts:**
```bash
npm run lighthouse        # Run performance tests
npm run lighthouse:build  # Build and test
```

---

## 📊 Running Performance Tests

### Local Testing

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Run Lighthouse Tests:**
   ```bash
   npm run lighthouse
   ```

3. **View Reports:**
   - Reports saved to `./lighthouse-reports/`
   - Open HTML files in browser for detailed analysis

### Production Build Testing

1. **Build and Test:**
   ```bash
   npm run lighthouse:build
   ```

2. **Manual Lighthouse Audit:**
   - Open Chrome DevTools (F12)
   - Navigate to "Lighthouse" tab
   - Select categories and run audit

### Automated CI Testing

Add to your CI/CD pipeline:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Run Lighthouse
        run: npm run lighthouse
```

---

## 🧪 Device Testing Requirements

### Required Device Testing

#### Desktop Browsers
- ✅ **Chrome** (Windows/Mac): Latest version
- ✅ **Firefox** (Windows/Mac): Latest version
- ✅ **Safari** (Mac): Latest version
- ✅ **Edge** (Windows): Latest version

#### Mobile Devices
- ✅ **iPhone** (Safari): iOS 15+
  - Test on iPhone 12/13/14 or newer
  - Verify RTL layout and Hebrew fonts
  - Check touch interactions and gestures

- ✅ **Android** (Chrome): Android 11+
  - Test on Samsung Galaxy S21+ or Pixel 6+
  - Verify performance on mid-range devices
  - Check PWA installation

#### Tablet
- ✅ **iPad** (Safari): iPadOS 15+
  - Test landscape and portrait modes
  - Verify responsive breakpoints
  - Check touch targets (min 44x44px)

### Testing Tools

#### Browser DevTools
```javascript
// Emulate different devices
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test RTL layout and performance
```

#### Responsive Testing
```bash
# Test different viewport sizes
Desktop: 1920x1080, 1440x900, 1366x768
Tablet: 1024x768, 768x1024
Mobile: 414x896, 390x844, 360x640
```

#### Performance Testing Checklist
- [ ] Test on 3G/4G connections (Chrome DevTools Network throttling)
- [ ] Test with browser extensions disabled
- [ ] Test in incognito/private mode
- [ ] Clear cache and test cold loads
- [ ] Test with JavaScript disabled (content should be visible)

---

## 🎯 Optimization Priorities

### High Priority (Do First)
1. **Images**: Ensure all images use Next/Image with proper sizing
2. **Fonts**: Verify Hebrew fonts load quickly with proper fallbacks
3. **LCP**: Optimize largest contentful paint element
4. **CLS**: Eliminate layout shifts (add dimensions to images/embeds)

### Medium Priority
1. **JavaScript Bundle**: Keep main bundle under 200KB
2. **Third-party Scripts**: Load analytics/tracking scripts asynchronously
3. **CSS**: Remove unused styles, inline critical CSS
4. **Caching**: Configure proper cache headers

### Low Priority (Polish)
1. **Animations**: Use CSS transforms instead of layout properties
2. **Service Worker**: Implement for offline support
3. **Resource Hints**: Add preconnect for critical domains
4. **Compression**: Ensure Brotli compression is enabled

---

## 📈 Monitoring & Continuous Improvement

### Regular Audits
- **Weekly**: Run Lighthouse on staging environment
- **Pre-deployment**: Run full performance suite before each release
- **Post-deployment**: Monitor Core Web Vitals in production

### Real User Monitoring (RUM)
- **Google Analytics 4**: Tracks actual user metrics
- **Core Web Vitals**: Available in Google Search Console
- **Custom Events**: Track critical user interactions

### Performance Budget
Set and enforce performance budgets:

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:seo': ['error', {minScore: 0.95}],
      },
    },
  },
};
```

---

## 🔧 Troubleshooting Common Issues

### Slow LCP
- **Problem**: Largest Contentful Paint > 2.5s
- **Solutions**:
  1. Optimize hero image (use WebP, proper sizing)
  2. Preload critical resources
  3. Reduce server response time
  4. Use CDN for static assets

### High CLS
- **Problem**: Content jumps during load
- **Solutions**:
  1. Add explicit width/height to images
  2. Reserve space for dynamic content
  3. Avoid inserting content above existing content
  4. Use font-display: swap with fallback fonts

### Large JavaScript Bundle
- **Problem**: Main bundle > 200KB
- **Solutions**:
  1. Implement code splitting
  2. Remove unused dependencies
  3. Use dynamic imports for heavy components
  4. Analyze bundle with `npm run build && npx @next/bundle-analyzer`

### Slow TTI (Time to Interactive)
- **Problem**: Page not interactive quickly
- **Solutions**:
  1. Reduce JavaScript execution time
  2. Defer non-critical scripts
  3. Use React Server Components
  4. Minimize main thread work

---

## 📚 Additional Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Next.js Performance Best Practices](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Google Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)
- [WebPageTest](https://www.webpagetest.org/)

---

## ✅ Pre-Launch Checklist

Before going live, ensure:

- [ ] All Lighthouse scores meet targets (Desktop & Mobile)
- [ ] Tested on all required devices and browsers
- [ ] Images optimized and lazy-loaded
- [ ] Fonts loading efficiently with fallbacks
- [ ] No console errors or warnings
- [ ] Accessibility score ≥95
- [ ] SEO metadata complete on all pages
- [ ] Analytics and tracking configured
- [ ] Performance monitoring set up
- [ ] SSL certificate installed and HTTPS enforced
- [ ] 404 and error pages configured
- [ ] Sitemap submitted to search engines
- [ ] Hebrew RTL layout verified across all pages

---

**Last Updated**: 2025-10-03
**Next Review**: Before each major release

# Testing Checklist - Liga Deals Berlin

## Overview
Comprehensive testing checklist for Liga Deals Berlin website with focus on RTL (Right-to-Left) support for Hebrew content.

---

## 🌐 RTL Layout Testing

### Browser RTL Support

**Test in all major browsers:**
- [ ] **Chrome** (Windows/Mac): RTL layout correct
- [ ] **Firefox** (Windows/Mac): RTL layout correct
- [ ] **Safari** (Mac/iOS): RTL layout correct
- [ ] **Edge** (Windows): RTL layout correct
- [ ] **Mobile Safari** (iOS): RTL layout correct
- [ ] **Chrome Mobile** (Android): RTL layout correct

### RTL Visual Elements

**✅ Text Direction (P0)**
- [ ] All Hebrew text flows right-to-left
- [ ] Paragraphs align to the right
- [ ] Headings align to the right
- [ ] Lists bullets/numbers on the right side
- [ ] Text wrapping is correct
- [ ] No text overflow or cutting

**✅ Layout Direction (P0)**
- [ ] Navigation menu items flow right-to-left
- [ ] Flex containers reverse correctly
- [ ] Grid layouts mirror properly
- [ ] Cards in grids flow right-to-left
- [ ] Sidebar on correct side (if applicable)
- [ ] Modal/dialog alignment correct

**✅ Icons & Arrows (P0)**
- [ ] Back arrows point RIGHT (→)
- [ ] Forward arrows point LEFT (←)
- [ ] Chevrons point correct direction
- [ ] "Read more" arrows point LEFT
- [ ] Carousel arrows reversed
- [ ] Dropdown arrows correct
- [ ] Sort arrows maintain meaning

**✅ Spacing & Margins (P0)**
- [ ] Margins flip correctly (margin-left ↔ margin-right)
- [ ] Padding flips correctly (padding-left ↔ padding-right)
- [ ] Text indentation on correct side
- [ ] Element spacing looks balanced
- [ ] No asymmetric spacing issues

**✅ Positioning (P1)**
- [ ] Absolute positioned elements flip correctly
- [ ] Fixed elements on correct side
- [ ] Sticky elements on correct side
- [ ] Floating elements flip
- [ ] Z-index stacking looks correct

**✅ Borders & Shadows (P1)**
- [ ] Border-radius corners flip correctly
- [ ] Box shadows flip direction
- [ ] Border-left/right flip correctly
- [ ] Outline direction correct
- [ ] Decorative lines on correct side

**✅ Animations & Transitions (P1)**
- [ ] Slide-in animations from correct direction
- [ ] Fade-in animations work correctly
- [ ] Transform animations flip appropriately
- [ ] Carousel/slider animations reverse
- [ ] Scroll animations trigger correctly

---

## 🔤 Hebrew Text Rendering

### Font Display

**✅ Typography (P0)**
- [ ] Heebo font loads correctly
- [ ] Assistant font loads correctly
- [ ] Font fallback works (system-ui, arial)
- [ ] Font weights render correctly (300-700)
- [ ] No FOUT (Flash of Unstyled Text)
- [ ] No FOIT (Flash of Invisible Text)

**✅ Text Styling (P0)**
- [ ] Line-height appropriate for Hebrew (1.6-1.8)
- [ ] Letter-spacing not too tight
- [ ] Bold text readable
- [ ] Italic text readable (if used)
- [ ] Text color contrast ≥ 4.5:1
- [ ] Link text distinguishable

**✅ Text Wrapping (P0)**
- [ ] Words don't break incorrectly
- [ ] Long words wrap appropriately
- [ ] No orphaned words
- [ ] Hyphens don't appear inappropriately
- [ ] Text doesn't overflow containers

**✅ Special Characters (P1)**
- [ ] Hebrew punctuation displays correctly
- [ ] Hebrew numbers display correctly (א, ב, ג...)
- [ ] Mixed Hebrew/English text displays correctly
- [ ] Quotation marks correct ("" vs "")
- [ ] Apostrophes and contractions correct

---

## 🧭 Navigation Testing

### Desktop Navigation

**✅ Header Navigation (P0)**
- [ ] Logo positioned correctly (typically left in RTL)
- [ ] Menu items flow right-to-left
- [ ] Hover states work
- [ ] Active states show correctly
- [ ] Dropdown menus open correctly
- [ ] Mega menu (if any) displays correctly

**✅ Mobile Navigation (P0)**
- [ ] Hamburger menu icon positioned correctly
- [ ] Menu slides from correct direction
- [ ] Menu items listed correctly
- [ ] Close button positioned correctly
- [ ] Touch targets ≥ 44x44px
- [ ] Swipe gestures work (if implemented)

**✅ Navigation Behavior (P0)**
- [ ] Links navigate correctly
- [ ] Active page highlighted
- [ ] Breadcrumbs flow right-to-left
- [ ] Skip to content link works
- [ ] Keyboard navigation works (Tab order)
- [ ] Focus indicators visible

### Footer Navigation

**✅ Footer Layout (P1)**
- [ ] Columns flow right-to-left
- [ ] Links align correctly
- [ ] Social icons positioned correctly
- [ ] Copyright text aligned right
- [ ] Logo positioned correctly

---

## 📝 Form Testing

### Contact Form

**✅ Form Layout (P0)**
- [ ] Labels aligned to the right
- [ ] Input fields have correct text-align
- [ ] Placeholder text aligned correctly
- [ ] Required field indicators on correct side
- [ ] Helper text positioned correctly
- [ ] Error messages positioned correctly

**✅ Form Validation (P0)**
- [ ] Required field validation works
- [ ] Email validation works (Hebrew characters not allowed)
- [ ] Phone validation works (international format)
- [ ] Min/max length validation works
- [ ] Error messages display in Hebrew
- [ ] Error icons/colors on correct side

**✅ Form Submission (P0)**
- [ ] Submit button positioned correctly
- [ ] Loading state displays correctly
- [ ] Success message displays correctly
- [ ] Error message displays correctly
- [ ] Form clears after submission
- [ ] Focus returns appropriately

**✅ Form Accessibility (P0)**
- [ ] Labels associated with inputs (for/id)
- [ ] ARIA labels correct
- [ ] Error announcements for screen readers
- [ ] Keyboard-only submission works
- [ ] Tab order is logical
- [ ] Required fields announced

### Search Form (if applicable)

**✅ Search Functionality (P1)**
- [ ] Search icon positioned correctly
- [ ] Input text-align correct
- [ ] Autocomplete dropdown aligned correctly
- [ ] Search button on correct side
- [ ] Clear button on correct side
- [ ] Results display correctly

---

## 🖼️ Gallery Testing

### Photo Gallery

**✅ Gallery Layout (P0)**
- [ ] Images flow right-to-left
- [ ] Grid gaps are even
- [ ] Masonry layout (if used) correct
- [ ] Image aspect ratios preserved
- [ ] Lazy loading works
- [ ] Hover effects work

**✅ Lightbox/Modal (P0)**
- [ ] Opens on image click
- [ ] Close button positioned correctly (top-left)
- [ ] Previous/Next buttons reversed (← →)
- [ ] Keyboard navigation works (arrow keys reversed)
- [ ] Swipe gestures work on mobile
- [ ] Caption text aligned right
- [ ] Image counter positioned correctly (1/10)

**✅ Mobile Gallery (P0)**
- [ ] Touch swipe left = previous image
- [ ] Touch swipe right = next image
- [ ] Pinch-to-zoom works
- [ ] Thumbnails scroll horizontally (RTL)
- [ ] No performance issues

### Video Gallery

**✅ Video Player (P1)**
- [ ] Play button centered
- [ ] Controls positioned correctly
- [ ] Timeline/scrubber works correctly
- [ ] Volume slider on correct side
- [ ] Fullscreen button positioned correctly
- [ ] Captions display correctly (if any)

---

## 📱 Responsive Design Testing

### Breakpoint Testing

**320px - Small Mobile (P0)**
- [ ] All content visible
- [ ] No horizontal scroll
- [ ] Text readable (min 16px)
- [ ] Touch targets ≥ 44x44px
- [ ] Images scale correctly
- [ ] Navigation usable

**768px - Tablet (P0)**
- [ ] Layout adapts correctly
- [ ] Sidebar behavior correct
- [ ] Grid columns adjust (3 → 2)
- [ ] Navigation switches appropriately
- [ ] Images scale correctly
- [ ] Forms are usable

**1024px - Desktop (P0)**
- [ ] Full layout displays
- [ ] Max-width containers centered
- [ ] Navigation full desktop version
- [ ] Grid displays all columns
- [ ] Spacing looks balanced
- [ ] All features accessible

**1440px+ - Large Desktop (P1)**
- [ ] Layout doesn't stretch too wide
- [ ] Content max-width applied
- [ ] Images don't pixelate
- [ ] Typography scales appropriately
- [ ] No awkward gaps

### Orientation Testing

**✅ Portrait Mode (P0)**
- [ ] Layout comfortable
- [ ] Navigation accessible
- [ ] Forms usable
- [ ] Images display correctly

**✅ Landscape Mode (P0)**
- [ ] Layout adjusts appropriately
- [ ] No content cut off
- [ ] Navigation still accessible
- [ ] Keyboard doesn't cover inputs

---

## ⏳ Loading States

### Initial Page Load

**✅ Loading Indicators (P0)**
- [ ] Skeleton screens display (if implemented)
- [ ] Loading spinners visible
- [ ] Progress indicators work
- [ ] Loading text in Hebrew
- [ ] Loading states don't cause layout shift

**✅ Content Loading (P0)**
- [ ] Images load progressively
- [ ] Lazy loading works
- [ ] Fonts load with fallback
- [ ] Critical CSS loads first
- [ ] JavaScript loads async
- [ ] No blocking resources

### Dynamic Content Loading

**✅ Infinite Scroll (if applicable) (P1)**
- [ ] Loads more content smoothly
- [ ] Loading indicator appears
- [ ] No duplicate content
- [ ] Scroll position maintained
- [ ] Works on mobile

**✅ AJAX/Fetch Loading (P1)**
- [ ] Loading state during fetch
- [ ] Optimistic updates work
- [ ] Error handling works
- [ ] Retry mechanism works
- [ ] Cancel requests work

---

## ❌ Error States

### Error Messages

**✅ Form Errors (P0)**
- [ ] Error message in Hebrew
- [ ] Error positioned correctly
- [ ] Error color contrast sufficient (red + text)
- [ ] Error icon on correct side
- [ ] Error announced to screen readers
- [ ] Error doesn't block form

**✅ Network Errors (P0)**
- [ ] Connection error message displayed
- [ ] Retry button available
- [ ] Offline indicator shown
- [ ] Graceful degradation
- [ ] User can recover

**✅ 404 Page (P0)**
- [ ] Custom 404 page displays
- [ ] Message in Hebrew
- [ ] Navigation still works
- [ ] Links to home page
- [ ] Search available (if applicable)

**✅ 500 Error Page (P0)**
- [ ] Custom 500 page displays
- [ ] Error message helpful
- [ ] Contact info available
- [ ] Can navigate away
- [ ] Error logged (server-side)

---

## 📭 Empty States

### No Content Scenarios

**✅ Empty Search Results (P1)**
- [ ] "No results" message in Hebrew
- [ ] Suggestions provided
- [ ] Clear search to try again
- [ ] Alternative navigation options
- [ ] No broken layout

**✅ Empty Gallery (P1)**
- [ ] "No photos" message
- [ ] Placeholder image (optional)
- [ ] Call-to-action to add content
- [ ] Layout doesn't break

**✅ No Blog Posts (P1)**
- [ ] "Coming soon" message
- [ ] Newsletter signup (if applicable)
- [ ] Alternative content
- [ ] Professional appearance

---

## 🎨 Visual Regression Testing

### Cross-Browser Consistency

**✅ Visual Parity (P0)**
- [ ] Chrome matches design
- [ ] Firefox matches Chrome
- [ ] Safari matches Chrome
- [ ] Edge matches Chrome
- [ ] Mobile browsers consistent

### RTL-Specific Visual Checks

**✅ Symmetry Validation (P0)**
- [ ] LTR design mirrored correctly
- [ ] No visual imbalance
- [ ] Spacing looks intentional
- [ ] Alignment is clean
- [ ] No overlapping elements

---

## ♿ Accessibility Testing

### Screen Reader Testing

**✅ VoiceOver/NVDA (P0)**
- [ ] Hebrew text announced correctly
- [ ] Navigation landmarks work
- [ ] Form labels announced
- [ ] Buttons described
- [ ] Images have alt text
- [ ] Heading hierarchy logical

### Keyboard Navigation

**✅ Keyboard-Only Usage (P0)**
- [ ] Tab order is logical (RTL-aware)
- [ ] Focus visible on all elements
- [ ] Skip to content works
- [ ] Dropdowns accessible
- [ ] Modals can be closed
- [ ] No keyboard traps

---

## 🔍 Common RTL Issues Checklist

### Layout Issues

- [ ] **Flexbox**: `flex-direction: row-reverse` where needed
- [ ] **Grid**: Check if columns need reversing
- [ ] **Float**: `float: left` → `float: right`
- [ ] **Text-align**: `text-align: right` for Hebrew
- [ ] **Absolute positioning**: Flip `left`/`right` values

### Spacing Issues

- [ ] **Margin**: Use logical properties (`margin-inline-start` instead of `margin-left`)
- [ ] **Padding**: Use logical properties (`padding-inline-end` instead of `padding-right`)
- [ ] **Border**: Check `border-left`/`border-right`
- [ ] **Scroll padding**: Adjust for RTL scroll direction

### Visual Issues

- [ ] **Arrows**: Flip arrow icons (→ becomes ←)
- [ ] **Chevrons**: Reverse chevron direction
- [ ] **Icons**: Mirror directional icons
- [ ] **Shadows**: Flip `box-shadow` horizontal offset
- [ ] **Border-radius**: Mirror corner radius if asymmetric

### Animation Issues

- [ ] **TranslateX**: Reverse direction (positive ↔ negative)
- [ ] **Slide animations**: Reverse entry/exit direction
- [ ] **Carousel**: Reverse swipe direction
- [ ] **Scroll animations**: Adjust trigger points

### Content Issues

- [ ] **Numbers**: Hebrew uses Western numerals (123, not א-ב-ג)
- [ ] **Dates**: Format for Hebrew locale (DD/MM/YYYY)
- [ ] **Currency**: ₪ symbol position (before or after)
- [ ] **Punctuation**: Hebrew uses different quotation marks

---

## 🧪 Testing Tools & Commands

### Automated Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:coverage

# Run Lighthouse tests
npm run lighthouse
```

### Manual Testing Tools

**Browser DevTools:**
- Chrome DevTools → Device Mode (Ctrl+Shift+M)
- Firefox Responsive Design Mode (Ctrl+Shift+M)
- Safari Web Inspector → Responsive Design Mode

**RTL Testing:**
- Set `dir="rtl"` in HTML tag (already done in layout.tsx)
- Use browser extension: "RTL Debugger" or "Force RTL"
- Test with Hebrew locale: Chrome → Settings → Languages

**Accessibility Testing:**
- Chrome Lighthouse (Accessibility tab)
- axe DevTools extension
- WAVE browser extension
- Keyboard-only navigation test

---

## 📋 Test Execution Checklist

### Before Testing
- [ ] Pull latest code from repository
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`)
- [ ] Clear browser cache
- [ ] Use incognito/private mode

### During Testing
- [ ] Follow checklist systematically
- [ ] Document all issues found
- [ ] Take screenshots of issues
- [ ] Note device/browser for each issue
- [ ] Categorize severity (P0/P1/P2)

### After Testing
- [ ] Create bug reports for P0 issues
- [ ] Create tickets for P1/P2 issues
- [ ] Share findings with team
- [ ] Retest after fixes
- [ ] Update this checklist if needed

---

## 🐛 Bug Report Template

```markdown
**Bug ID**: RTL-001
**Severity**: P0 / P1 / P2
**Component**: Navigation / Form / Gallery / etc.

**Issue**:
[Brief description of the issue]

**Steps to Reproduce**:
1. Navigate to [page]
2. [Action]
3. [Expected vs Actual]

**Expected Behavior**:
[What should happen in RTL mode]

**Actual Behavior**:
[What actually happens]

**Screenshots**:
[Attach screenshot showing the issue]

**Environment**:
- Browser: Chrome 118
- OS: Windows 11
- Device: Desktop
- Screen size: 1920x1080
- Language: Hebrew (he-IL)

**Suggested Fix**:
[If you have a suggestion]
```

---

## ✅ Sign-Off Checklist

Before marking testing as complete:

- [ ] All P0 issues resolved
- [ ] All P1 issues documented and scheduled
- [ ] All P2 issues logged for future consideration
- [ ] RTL layout tested in all major browsers
- [ ] Hebrew text rendering verified
- [ ] Navigation works in all scenarios
- [ ] Forms validated and functional
- [ ] Galleries work on all devices
- [ ] Responsive design verified at all breakpoints
- [ ] Loading states implemented and tested
- [ ] Error states handled gracefully
- [ ] Empty states designed and implemented
- [ ] Accessibility audit passed (score ≥95)
- [ ] Performance targets met (Lighthouse ≥90)

**Tested By**: _______________
**Date**: _______________
**Approved By**: _______________
**Date**: _______________

---

**Last Updated**: 2025-10-03
**Version**: 1.0
**Next Review**: Before each major release

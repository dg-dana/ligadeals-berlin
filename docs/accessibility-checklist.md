# Accessibility Checklist - Traveliga

## Overview
Comprehensive accessibility checklist to ensure WCAG 2.1 Level AA compliance for Traveliga website.

**Target Compliance Level**: WCAG 2.1 Level AA
**Primary Language**: Hebrew (he-IL)
**Text Direction**: Right-to-Left (RTL)

---

## 🎯 WCAG 2.1 Principles

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

### 2. Operable
User interface components and navigation must be operable.

### 3. Understandable
Information and the operation of user interface must be understandable.

### 4. Robust
Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

---

## ⌨️ Keyboard Navigation

### Essential Keyboard Controls

**✅ Tab Navigation (P0)**
- [ ] Tab moves focus forward through all interactive elements
- [ ] Shift+Tab moves focus backward
- [ ] Tab order is logical and follows visual layout
- [ ] Tab order respects RTL direction (right to left, top to bottom)
- [ ] No keyboard traps (can always tab out)
- [ ] Skip to content link is first focusable element

**✅ Interactive Elements (P0)**
- [ ] Enter activates links and buttons
- [ ] Space activates buttons
- [ ] Space scrolls page (when not on button)
- [ ] Arrow keys work in dropdowns/menus
- [ ] Escape closes modals/dialogs
- [ ] Escape cancels operations

**✅ Form Controls (P0)**
- [ ] Tab moves between form fields
- [ ] Arrow keys work in select/radio groups
- [ ] Space toggles checkboxes
- [ ] Enter submits forms
- [ ] Can navigate validation errors with keyboard

**✅ Custom Components (P1)**
- [ ] Carousel: Left/Right arrows navigate (reversed for RTL)
- [ ] Lightbox: Arrow keys navigate images, Escape closes
- [ ] Mobile menu: Can open/close with keyboard
- [ ] Dropdown menus: Arrow keys navigate items
- [ ] Accordion: Space/Enter toggles sections

### Testing Procedure

1. **Disconnect mouse** or don't use it
2. **Start from top** of page with Tab key
3. **Navigate entire page** using only keyboard
4. **Test all interactions**: clicks, forms, modals
5. **Verify focus indicator** is always visible
6. **Check tab order** makes sense logically

**Test Checklist:**
- [ ] Can navigate to all interactive elements
- [ ] Tab order is logical (RTL-aware)
- [ ] Focus indicator always visible
- [ ] No keyboard traps
- [ ] All actions possible via keyboard
- [ ] Skip links work correctly

---

## 🎤 Screen Reader Support

### Screen Reader Testing Tools

**Free Screen Readers:**
- **NVDA** (Windows) - https://www.nvaccess.org/
- **VoiceOver** (macOS/iOS) - Built-in (Cmd+F5)
- **TalkBack** (Android) - Built-in
- **JAWS** (Windows) - Commercial, widely used

### Content Structure

**✅ Semantic HTML (P0)**
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Only one H1 per page
- [ ] Headings not skipped (no H1 → H3)
- [ ] Lists use `<ul>`, `<ol>`, `<li>` elements
- [ ] Semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`

**✅ Landmarks (P0)**
- [ ] `<header>` or `role="banner"` for site header
- [ ] `<nav>` or `role="navigation"` for navigation
- [ ] `<main>` or `role="main"` for main content (only one)
- [ ] `<aside>` or `role="complementary"` for sidebars
- [ ] `<footer>` or `role="contentinfo"` for site footer
- [ ] Landmarks have unique labels when multiple (aria-label)

**✅ Images (P0)**
- [ ] All images have alt text
- [ ] Decorative images: `alt=""` (empty alt)
- [ ] Informative images: Descriptive alt text in Hebrew
- [ ] Complex images: Detailed description nearby or longdesc
- [ ] Logo alt text: "Traveliga"
- [ ] Icons with meaning: Use aria-label

**✅ Links (P0)**
- [ ] Link text is descriptive ("קרא עוד על שירותינו" not "לחץ כאן")
- [ ] Links to external sites identified
- [ ] Links that open new window announced
- [ ] "Read more" links include context
- [ ] Icon-only links have aria-label

**✅ Forms (P0)**
- [ ] All inputs have associated `<label>` (for/id match)
- [ ] Labels in Hebrew
- [ ] Required fields marked (aria-required="true")
- [ ] Error messages announced (aria-live, aria-describedby)
- [ ] Fieldsets group related inputs
- [ ] Instructions provided before form
- [ ] Placeholder text not sole label

**✅ Tables (P1)**
- [ ] Data tables use `<table>`, `<th>`, `<td>`
- [ ] Table headers use `<th>` with scope attribute
- [ ] Complex tables have caption
- [ ] Layout tables avoided (use CSS Grid/Flexbox)

**✅ ARIA Attributes (P0)**
- [ ] ARIA labels in Hebrew
- [ ] `aria-label` for icon buttons
- [ ] `aria-labelledby` for complex labels
- [ ] `aria-describedby` for additional context
- [ ] `aria-hidden="true"` for decorative elements
- [ ] `aria-live` for dynamic content updates
- [ ] `aria-current` for current page/step
- [ ] `aria-expanded` for expandable sections

### Screen Reader Testing Checklist

**Test with NVDA (Windows):**
1. [ ] Install NVDA from nvaccess.org
2. [ ] Start NVDA (Ctrl+Alt+N)
3. [ ] Navigate page with arrow keys
4. [ ] Jump between headings (H key)
5. [ ] Jump between landmarks (D key)
6. [ ] List all links (Insert+F7)
7. [ ] Test form navigation (Tab, F key)
8. [ ] Verify Hebrew text is announced correctly

**Test with VoiceOver (macOS):**
1. [ ] Enable VoiceOver (Cmd+F5)
2. [ ] Navigate with VoiceOver (VO+Arrow keys)
3. [ ] Rotor through headings (VO+U, then arrows)
4. [ ] Test forms (VO+Space to interact)
5. [ ] Verify RTL navigation works correctly

**Common Issues to Check:**
- [ ] Images without alt text
- [ ] Form inputs without labels
- [ ] Buttons without accessible names
- [ ] Unlabeled icon buttons
- [ ] Incorrect heading hierarchy
- [ ] Missing landmarks
- [ ] Incorrect ARIA usage

---

## 🎨 Color Contrast

### WCAG AA Requirements

**Contrast Ratios:**
- **Normal text**: Minimum 4.5:1
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1
- **UI components**: Minimum 3:1
- **Graphical objects**: Minimum 3:1

### Testing Tools

**Browser Tools:**
- Chrome DevTools → Lighthouse → Accessibility
- Firefox Accessibility Inspector
- Edge DevTools → Lighthouse

**Online Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Colorable: https://colorable.jxnblk.com/
- Contrast Ratio: https://contrast-ratio.com/

**Color Blindness Simulators:**
- Chrome Extension: "Colorblinding"
- Figma Plugin: "Color Blind"
- Online: Coblis - Color Blindness Simulator

### Color Contrast Checklist

**✅ Text Contrast (P0)**
- [ ] Body text on white: ≥ 4.5:1
- [ ] Body text on colored backgrounds: ≥ 4.5:1
- [ ] Headings: ≥ 4.5:1 (≥ 3:1 if large)
- [ ] Links: ≥ 4.5:1 and distinguishable from text
- [ ] Button text: ≥ 4.5:1
- [ ] Form labels: ≥ 4.5:1
- [ ] Error messages: ≥ 4.5:1

**✅ Interactive Elements (P0)**
- [ ] Button borders: ≥ 3:1
- [ ] Input borders: ≥ 3:1
- [ ] Focus indicators: ≥ 3:1
- [ ] Link hover states: ≥ 3:1
- [ ] Icon buttons: ≥ 3:1

**✅ Visual Indicators (P0)**
- [ ] Color not sole indicator of state
- [ ] Error states use icon + color
- [ ] Success states use icon + color
- [ ] Required fields use asterisk + color
- [ ] Charts/graphs use patterns + color

**✅ Dark Mode (P1)**
- [ ] Dark mode passes contrast requirements
- [ ] Text readable in dark mode
- [ ] Interactive elements visible
- [ ] Focus indicators visible

### Current Color Palette

Test these combinations:

| Element | Foreground | Background | Ratio | Pass? |
|---------|-----------|------------|-------|-------|
| Body text | #1a1a1a | #ffffff | TBD | ⬜ |
| Headings | #1a1a1a | #ffffff | TBD | ⬜ |
| Links | #2563eb | #ffffff | TBD | ⬜ |
| Buttons | #ffffff | #2563eb | TBD | ⬜ |
| Errors | #dc2626 | #ffffff | TBD | ⬜ |
| Success | #16a34a | #ffffff | TBD | ⬜ |

---

## 👁️ Focus Indicators

### Requirements

**✅ Visible Focus (P0)**
- [ ] All interactive elements have visible focus
- [ ] Focus indicator clearly distinguishable
- [ ] Focus indicator ≥ 2px thick
- [ ] Focus indicator contrasts with background (≥ 3:1)
- [ ] Focus style consistent across site
- [ ] Focus not removed with `outline: none` (unless replaced)

**✅ Focus Order (P0)**
- [ ] Focus order follows visual layout
- [ ] Focus order respects RTL direction
- [ ] Hidden elements not in focus order
- [ ] Modals trap focus appropriately
- [ ] Focus returns after modal closes

**✅ Custom Focus Styles (P1)**
- [ ] Blue outline for links
- [ ] Thicker border for buttons
- [ ] Highlight background for inputs
- [ ] Consistent across browsers

### Testing Focus

**Manual Test:**
1. Tab through entire page
2. Verify every interactive element has visible focus
3. Check focus is easily distinguishable
4. Verify focus order is logical

**Automated Test:**
```javascript
// Check for removed outlines
document.querySelectorAll('*').forEach(el => {
  const style = window.getComputedStyle(el);
  if (style.outline === 'none' && !style.boxShadow) {
    console.warn('Element has no focus indicator:', el);
  }
});
```

---

## 📝 Forms Accessibility

### Form Structure

**✅ Labels (P0)**
- [ ] All inputs have `<label>` elements
- [ ] Labels use `for` attribute matching input `id`
- [ ] Labels visible (not placeholder-only)
- [ ] Labels in Hebrew
- [ ] Labels descriptive and concise

**✅ Required Fields (P0)**
- [ ] Required fields marked with `required` attribute
- [ ] Required fields have `aria-required="true"`
- [ ] Visual indicator (* or "חובה")
- [ ] Required fields announced by screen readers

**✅ Instructions (P0)**
- [ ] Form purpose clear
- [ ] Instructions before form
- [ ] Complex fields have help text
- [ ] Format requirements explained
- [ ] Character limits indicated

**✅ Error Handling (P0)**
- [ ] Errors announced with `aria-live="polite"`
- [ ] Error messages descriptive in Hebrew
- [ ] Errors linked with `aria-describedby`
- [ ] Error summary at top of form
- [ ] Invalid fields marked with `aria-invalid="true"`
- [ ] Focus moved to first error
- [ ] Errors persist until corrected

**✅ Validation (P1)**
- [ ] Client-side validation doesn't block submission
- [ ] Server-side validation always performed
- [ ] Clear success message after submission
- [ ] Form not cleared on error
- [ ] Inline validation doesn't interrupt typing

### Example Accessible Form Field

```html
<div>
  <label for="fullName" class="block mb-2">
    שם מלא <span aria-label="שדה חובה">*</span>
  </label>
  <input
    id="fullName"
    type="text"
    required
    aria-required="true"
    aria-invalid="false"
    aria-describedby="fullName-error fullName-help"
  />
  <p id="fullName-help" class="text-sm text-gray-600">
    הכנס שם פרטי ושם משפחה
  </p>
  <p id="fullName-error" class="text-red-600" role="alert" aria-live="polite">
    <!-- Error message appears here -->
  </p>
</div>
```

---

## 📱 Mobile Accessibility

### Touch Targets

**✅ Target Size (P0)**
- [ ] All touch targets ≥ 44x44 CSS pixels
- [ ] Adequate spacing between targets (8px minimum)
- [ ] Links and buttons easy to tap
- [ ] No overlapping tap areas

**✅ Gestures (P1)**
- [ ] All gestures have alternatives
- [ ] Swipe actions also accessible via buttons
- [ ] Multi-finger gestures optional
- [ ] Drag-and-drop has alternative

### Mobile Screen Readers

**✅ VoiceOver (iOS) (P0)**
- [ ] Test with VoiceOver enabled
- [ ] Swipe navigation works
- [ ] Double-tap activates elements
- [ ] Headings navigation (rotor)
- [ ] Forms accessible

**✅ TalkBack (Android) (P0)**
- [ ] Test with TalkBack enabled
- [ ] Swipe navigation works
- [ ] Double-tap activates elements
- [ ] Navigate by headings
- [ ] Forms accessible

---

## 🖼️ Images & Media

### Images

**✅ Alternative Text (P0)**
- [ ] All `<img>` elements have `alt` attribute
- [ ] Decorative images: `alt=""`
- [ ] Informative images: Descriptive alt in Hebrew
- [ ] Complex images: Detailed description
- [ ] Alt text not redundant with nearby text
- [ ] Alt text < 150 characters

**Examples:**
```html
<!-- Informative -->
<img src="berlin.jpg" alt="נוף של ברלין בשקיעה" />

<!-- Decorative -->
<img src="divider.png" alt="" role="presentation" />

<!-- Logo -->
<img src="logo.png" alt="Traveliga" />

<!-- Icon with context -->
<button>
  <img src="search.svg" alt="" aria-hidden="true" />
  <span>חיפוש</span>
</button>
```

### Video & Audio

**✅ Video Accessibility (P1)**
- [ ] Captions for all speech
- [ ] Captions in Hebrew
- [ ] Transcripts available
- [ ] Audio descriptions (if needed)
- [ ] Accessible media player controls

**✅ Audio Accessibility (P1)**
- [ ] Transcripts for audio content
- [ ] No auto-playing media
- [ ] Accessible play/pause controls

---

## 🔗 Links & Navigation

### Link Text

**✅ Descriptive Links (P0)**
- [ ] Link text describes destination
- [ ] Avoid "לחץ כאן" (Click here)
- [ ] Avoid "קרא עוד" alone (add context)
- [ ] External links identified
- [ ] PDF links identified
- [ ] Links that open new window announced

**Examples:**
```html
<!-- Bad -->
<a href="/services">לחץ כאן</a>

<!-- Good -->
<a href="/services">קרא עוד על השירותים שלנו</a>

<!-- External link -->
<a href="https://example.com" target="_blank" rel="noopener">
  בקר באתר החיצוני
  <span class="sr-only">(נפתח בחלון חדש)</span>
</a>

<!-- PDF link -->
<a href="/guide.pdf">
  מדריך למשתמש
  <span class="sr-only">(PDF, 2MB)</span>
</a>
```

### Navigation Structure

**✅ Navigation Patterns (P0)**
- [ ] Consistent navigation across pages
- [ ] Multiple ways to find content (menu, search, sitemap)
- [ ] Breadcrumbs for deep pages
- [ ] Skip to content link
- [ ] Current page indicated (aria-current)

---

## 📊 Dynamic Content

### Live Regions

**✅ ARIA Live (P0)**
- [ ] Status updates announced (`aria-live="polite"`)
- [ ] Urgent updates announced (`aria-live="assertive"`)
- [ ] Content changes announced
- [ ] Loading states announced
- [ ] Error messages announced

**Examples:**
```html
<!-- Status update -->
<div role="status" aria-live="polite">
  <p>הטופס נשלח בהצלחה</p>
</div>

<!-- Error alert -->
<div role="alert" aria-live="assertive">
  <p>שגיאה: נא למלא את כל השדות</p>
</div>

<!-- Loading -->
<div role="status" aria-live="polite" aria-busy="true">
  <p>טוען...</p>
</div>
```

### Modal Dialogs

**✅ Modal Accessibility (P0)**
- [ ] Focus trapped in modal
- [ ] Escape closes modal
- [ ] Focus returns to trigger after close
- [ ] Modal announced as dialog (`role="dialog"`)
- [ ] Modal labeled (`aria-labelledby`)
- [ ] Background content inert (`aria-hidden="true"` or `inert`)

---

## 🧪 Automated Testing Tools

### Browser DevTools

**✅ Chrome Lighthouse (P0)**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility"
4. Run audit
5. Fix issues with score < 95

**✅ Firefox Accessibility Inspector (P1)**
1. Open DevTools (F12)
2. Go to Accessibility tab
3. Check for issues
4. Verify contrast ratios

### Browser Extensions

**✅ axe DevTools (P0)**
- Install: https://www.deque.com/axe/devtools/
- Run automated tests
- Get detailed issue reports
- Learn how to fix issues

**✅ WAVE (P0)**
- Install: https://wave.webaim.org/extension/
- Visual feedback on page
- Identifies errors and warnings
- Shows structural elements

**✅ NoCoffee (P1)**
- Simulate vision impairments
- Test with color blindness
- Test with low vision
- Verify readability

### Command Line Tools

```bash
# Pa11y - Automated accessibility testing
npm install -g pa11y
pa11y http://localhost:3000

# Axe CLI
npm install -g @axe-core/cli
axe http://localhost:3000
```

---

## ✅ Accessibility Audit Process

### Before Launch

1. **Automated Testing**
   - [ ] Run Lighthouse accessibility audit (score ≥ 95)
   - [ ] Run axe DevTools on all pages
   - [ ] Run WAVE on all pages
   - [ ] Fix all critical issues

2. **Manual Testing**
   - [ ] Keyboard navigation complete site
   - [ ] Screen reader test (NVDA/VoiceOver)
   - [ ] Test with screen at 200% zoom
   - [ ] Test all forms
   - [ ] Test all interactive components

3. **Real User Testing**
   - [ ] Test with actual screen reader users
   - [ ] Test with keyboard-only users
   - [ ] Test with users with low vision
   - [ ] Incorporate feedback

### Ongoing Maintenance

**Monthly:**
- [ ] Run automated accessibility tests
- [ ] Check new pages/features
- [ ] Review and fix any issues

**Quarterly:**
- [ ] Full site audit with screen reader
- [ ] Test with updated assistive technologies
- [ ] Review WCAG updates
- [ ] Update this checklist

---

## 📋 Compliance Checklist

### WCAG 2.1 Level A (Must Have)

- [ ] 1.1.1 Non-text Content: All images have alt text
- [ ] 1.2.1 Audio-only/Video-only: Alternatives provided
- [ ] 1.3.1 Info and Relationships: Semantic HTML
- [ ] 1.3.2 Meaningful Sequence: Logical content order
- [ ] 1.3.3 Sensory Characteristics: Not relying on shape/color alone
- [ ] 1.4.1 Use of Color: Color not sole indicator
- [ ] 1.4.2 Audio Control: Can pause/stop audio
- [ ] 2.1.1 Keyboard: All functionality via keyboard
- [ ] 2.1.2 No Keyboard Trap: Can navigate away
- [ ] 2.2.1 Timing Adjustable: User control over timing
- [ ] 2.2.2 Pause, Stop, Hide: Control over moving content
- [ ] 2.3.1 Three Flashes: No content flashes > 3 times/sec
- [ ] 2.4.1 Bypass Blocks: Skip to content link
- [ ] 2.4.2 Page Titled: Unique, descriptive titles
- [ ] 2.4.3 Focus Order: Logical focus order
- [ ] 2.4.4 Link Purpose: Link text descriptive
- [ ] 3.1.1 Language of Page: HTML lang attribute
- [ ] 3.2.1 On Focus: No context change on focus
- [ ] 3.2.2 On Input: No unexpected context change
- [ ] 3.3.1 Error Identification: Errors identified
- [ ] 3.3.2 Labels or Instructions: Form labels present
- [ ] 4.1.1 Parsing: Valid HTML
- [ ] 4.1.2 Name, Role, Value: ARIA implemented correctly

### WCAG 2.1 Level AA (Target)

- [ ] 1.2.4 Captions (Live): Live captions for video
- [ ] 1.2.5 Audio Description: Audio descriptions for video
- [ ] 1.3.4 Orientation: Works in both orientations
- [ ] 1.3.5 Identify Input Purpose: Input autocomplete
- [ ] 1.4.3 Contrast (Minimum): 4.5:1 contrast ratio
- [ ] 1.4.4 Resize text: Text scalable to 200%
- [ ] 1.4.5 Images of Text: Use real text, not images
- [ ] 1.4.10 Reflow: Content reflows at 320px
- [ ] 1.4.11 Non-text Contrast: UI components 3:1
- [ ] 1.4.12 Text Spacing: Customizable spacing
- [ ] 1.4.13 Content on Hover/Focus: Dismissible tooltips
- [ ] 2.4.5 Multiple Ways: Multiple navigation methods
- [ ] 2.4.6 Headings and Labels: Descriptive headings
- [ ] 2.4.7 Focus Visible: Focus indicators visible
- [ ] 2.5.1 Pointer Gestures: Alternatives to complex gestures
- [ ] 2.5.2 Pointer Cancellation: Can cancel actions
- [ ] 2.5.3 Label in Name: Accessible name matches visible label
- [ ] 2.5.4 Motion Actuation: Alternative to motion activation
- [ ] 3.1.2 Language of Parts: Language changes marked
- [ ] 3.2.3 Consistent Navigation: Nav consistent across pages
- [ ] 3.2.4 Consistent Identification: Icons/buttons consistent
- [ ] 3.3.3 Error Suggestion: Error correction suggested
- [ ] 3.3.4 Error Prevention: Confirm important actions
- [ ] 4.1.3 Status Messages: Status updates announced

---

## 📞 Resources

### Official Guidelines
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/

### Testing Tools
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Lighthouse: Built into Chrome DevTools
- NVDA: https://www.nvaccess.org/

### Learning Resources
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/
- Inclusive Components: https://inclusive-components.design/

### Hebrew Accessibility
- Israeli accessibility standard (תקן ישראלי 5568)
- Hebrew WCAG resources: https://www.isoc.org.il/accessibility

---

**Last Updated**: 2025-10-03
**Compliance Level**: WCAG 2.1 Level AA
**Next Audit**: Before production launch

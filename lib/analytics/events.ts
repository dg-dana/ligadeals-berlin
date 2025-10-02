// Google Analytics event tracking helpers
// All events are typed for better developer experience

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      eventNameOrConfig: string | Date,
      params?: Record<string, any>
    ) => void;
  }
}

// Check if gtag is available
function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// Event parameter interfaces
interface ContactFormSubmissionParams {
  form_name?: string;
  method?: string; // 'contact_form', 'whatsapp', 'email'
  success?: boolean;
}

interface ArticleViewParams {
  article_title: string;
  article_category?: string;
  article_author?: string;
  article_id?: string;
}

interface WhatsAppClickParams {
  source_page: string;
  button_location?: string; // 'floating', 'contact_page', 'footer', etc.
}

interface GalleryInteractionParams {
  gallery_type: 'photos' | 'videos';
  action: 'view' | 'open' | 'share' | 'download';
  item_id?: string;
  item_title?: string;
}

interface SearchParams {
  search_term: string;
  search_results?: number;
}

interface NewsletterSignupParams {
  source_page: string;
  location?: string; // 'footer', 'popup', 'inline'
}

interface SocialShareParams {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email' | 'copy_link';
  content_type: 'article' | 'gallery' | 'page';
  content_id?: string;
  content_title?: string;
}

interface OutboundLinkParams {
  link_url: string;
  link_text?: string;
  link_domain?: string;
}

interface VideoPlayParams {
  video_title: string;
  video_id?: string;
  video_provider?: string; // 'youtube', 'vimeo', 'native'
}

/**
 * Track contact form submission
 * Use this when a user submits the contact form
 */
export function trackContactFormSubmission(params: ContactFormSubmissionParams = {}) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'contact_form_submission', {
    event_category: 'engagement',
    event_label: params.form_name || 'contact_form',
    form_name: params.form_name || 'Contact Form',
    method: params.method || 'contact_form',
    success: params.success !== false,
    ...params,
  });

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: contact_form_submission', params);
  }
}

/**
 * Track article/blog post view
 * Use this when a user views an article
 */
export function trackArticleView(params: ArticleViewParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'article_view', {
    event_category: 'content',
    event_label: params.article_title,
    article_title: params.article_title,
    article_category: params.article_category,
    article_author: params.article_author,
    article_id: params.article_id,
    content_type: 'article',
    ...params,
  });

  // Also track as a standard content view
  window.gtag('event', 'view_item', {
    items: [
      {
        item_id: params.article_id,
        item_name: params.article_title,
        item_category: params.article_category,
        item_brand: params.article_author,
      },
    ],
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: article_view', params);
  }
}

/**
 * Track WhatsApp button click
 * Use this when a user clicks WhatsApp contact button
 */
export function trackWhatsAppClick(params: WhatsAppClickParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: params.source_page,
    source_page: params.source_page,
    button_location: params.button_location || 'unknown',
    contact_method: 'whatsapp',
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: whatsapp_click', params);
  }
}

/**
 * Track gallery interaction
 * Use this when a user interacts with photo or video gallery
 */
export function trackGalleryInteraction(params: GalleryInteractionParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'gallery_interaction', {
    event_category: 'engagement',
    event_label: `${params.gallery_type}_${params.action}`,
    gallery_type: params.gallery_type,
    action: params.action,
    item_id: params.item_id,
    item_title: params.item_title,
    content_type: params.gallery_type,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: gallery_interaction', params);
  }
}

/**
 * Track search
 * Use this when a user performs a search
 */
export function trackSearch(params: SearchParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'search', {
    search_term: params.search_term,
    search_results: params.search_results,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: search', params);
  }
}

/**
 * Track newsletter signup
 * Use this when a user subscribes to newsletter
 */
export function trackNewsletterSignup(params: NewsletterSignupParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'newsletter_signup', {
    event_category: 'engagement',
    event_label: params.source_page,
    source_page: params.source_page,
    location: params.location || 'unknown',
    ...params,
  });

  // Also track as a standard sign_up event
  window.gtag('event', 'sign_up', {
    method: 'newsletter',
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: newsletter_signup', params);
  }
}

/**
 * Track social share
 * Use this when a user shares content on social media
 */
export function trackSocialShare(params: SocialShareParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'share', {
    method: params.platform,
    content_type: params.content_type,
    item_id: params.content_id,
    item_name: params.content_title,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: share', params);
  }
}

/**
 * Track outbound link click
 * Use this when a user clicks on an external link
 */
export function trackOutboundLink(params: OutboundLinkParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'outbound_link_click', {
    event_category: 'engagement',
    event_label: params.link_url,
    link_url: params.link_url,
    link_text: params.link_text,
    link_domain: params.link_domain || new URL(params.link_url).hostname,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: outbound_link_click', params);
  }
}

/**
 * Track video play
 * Use this when a user plays a video
 */
export function trackVideoPlay(params: VideoPlayParams) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'video_play', {
    event_category: 'engagement',
    event_label: params.video_title,
    video_title: params.video_title,
    video_id: params.video_id,
    video_provider: params.video_provider || 'unknown',
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: video_play', params);
  }
}

/**
 * Track button click
 * Generic button click tracking
 */
export function trackButtonClick(
  buttonName: string,
  additionalParams?: Record<string, any>
) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_name: buttonName,
    ...additionalParams,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: button_click', { buttonName, ...additionalParams });
  }
}

/**
 * Track scroll depth
 * Use this to measure how far users scroll on a page
 */
export function trackScrollDepth(
  percentage: 25 | 50 | 75 | 90 | 100,
  pagePath?: string
) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_percentage: percentage,
    page_path: pagePath || window.location.pathname,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: scroll_depth', { percentage });
  }
}

/**
 * Track file download
 * Use this when a user downloads a file
 */
export function trackFileDownload(fileName: string, fileType?: string) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_name: fileName,
    file_type: fileType || fileName.split('.').pop(),
    file_extension: fileName.split('.').pop(),
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: file_download', { fileName, fileType });
  }
}

/**
 * Track exception/error
 * Use this to track JavaScript errors or exceptions
 */
export function trackException(description: string, fatal: boolean = false) {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'exception', {
    description,
    fatal,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: exception', { description, fatal });
  }
}

/**
 * Track custom event
 * Use this for any custom event not covered by the above functions
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (!isGtagAvailable()) return;

  window.gtag('event', eventName, params);

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event: custom', { eventName, params });
  }
}

/**
 * Set user properties
 * Use this to set user-level properties
 */
export function setUserProperties(properties: Record<string, any>) {
  if (!isGtagAvailable()) return;

  window.gtag('set', 'user_properties', properties);

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4: Set user properties', properties);
  }
}

/**
 * Set user ID
 * Use this to set a unique user ID (for logged-in users)
 */
export function setUserId(userId: string) {
  if (!isGtagAvailable()) return;

  window.gtag('set', { user_id: userId });

  if (process.env.NODE_ENV === 'development') {
    console.log('GA4: Set user ID', userId);
  }
}

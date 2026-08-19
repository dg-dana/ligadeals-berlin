// Robust YouTube/Vimeo embed-URL parsing for the video gallery.
//
// Editors paste video links straight into the Sanity `video.videoUrl` field,
// which is a plain `url` type with no shape validation. The player therefore
// has to cope with every common form of YouTube and Vimeo URL, and degrade
// gracefully (rather than showing a broken iframe) when a link can't be
// embedded.
//
// Privacy: YouTube is embedded through youtube-nocookie.com and Vimeo with Do
// Not Track (dnt=1) enabled, so neither can drop tracking cookies on playback.
// The iframe is only rendered once a visitor opens a video, so no request
// reaches YouTube/Vimeo until they choose to play one.

export type VideoProvider = 'youtube' | 'vimeo';

export interface VideoEmbed {
  /** URL to load in the player iframe. */
  embedUrl: string;
  /** Which service the video is hosted on. */
  provider: VideoProvider;
  /** The extracted video id, useful for analytics. */
  videoId: string;
}

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID = /^\d+$/;

function parseUrl(raw: string): URL | null {
  try {
    return new URL(raw.trim());
  } catch {
    return null;
  }
}

/**
 * Extract the 11-character YouTube video id from any common YouTube URL:
 *   - youtube.com/watch?v=ID
 *   - youtu.be/ID
 *   - youtube.com/shorts/ID
 *   - youtube.com/embed/ID
 *   - youtube.com/live/ID
 *   - youtube.com/v/ID
 *   - m.youtube.com and youtube-nocookie.com variants of the above
 * Returns null if the host isn't YouTube or no valid id can be found.
 */
function getYouTubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return id && YOUTUBE_ID.test(id) ? id : null;
  }

  const isYouTubeHost =
    host === 'youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'youtube-nocookie.com' ||
    host === 'music.youtube.com';
  if (!isYouTubeHost) return null;

  // watch?v=ID (and legacy /watch/ID)
  const v = url.searchParams.get('v');
  if (v && YOUTUBE_ID.test(v)) return v;

  // Path-based forms: /shorts/ID, /embed/ID, /live/ID, /v/ID
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length >= 2 && ['shorts', 'embed', 'live', 'v'].includes(segments[0])) {
    const id = segments[1];
    return YOUTUBE_ID.test(id) ? id : null;
  }

  return null;
}

/**
 * Extract the numeric Vimeo id from any common Vimeo URL:
 *   - vimeo.com/ID
 *   - vimeo.com/ID/HASH        (unlisted / private link)
 *   - vimeo.com/channels/NAME/ID
 *   - vimeo.com/groups/NAME/videos/ID
 *   - player.vimeo.com/video/ID
 * Returns the id plus an optional privacy hash, or null if not a Vimeo URL.
 */
function getVimeoId(url: URL): { id: string; hash?: string } | null {
  const host = url.hostname.replace(/^www\./, '');
  if (host !== 'vimeo.com' && host !== 'player.vimeo.com') return null;

  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  // player.vimeo.com/video/ID
  if (host === 'player.vimeo.com') {
    const idx = segments.indexOf('video');
    const id = idx >= 0 ? segments[idx + 1] : undefined;
    return id && VIMEO_ID.test(id) ? { id } : null;
  }

  // The video id is the last purely-numeric segment; the segment that follows
  // it (if any) is the unlisted-link privacy hash.
  for (let i = segments.length - 1; i >= 0; i--) {
    if (VIMEO_ID.test(segments[i])) {
      const hash = segments[i + 1];
      return hash ? { id: segments[i], hash } : { id: segments[i] };
    }
  }
  return null;
}

/**
 * Turn a raw YouTube/Vimeo URL into an embeddable player URL.
 * Returns null when the URL isn't a recognizable, embeddable video link, so
 * callers can render a fallback instead of a broken iframe.
 */
export function getVideoEmbed(rawUrl: string): VideoEmbed | null {
  if (!rawUrl) return null;
  const url = parseUrl(rawUrl);
  if (!url) return null;

  const youTubeId = getYouTubeId(url);
  if (youTubeId) {
    return {
      provider: 'youtube',
      videoId: youTubeId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0`,
    };
  }

  const vimeo = getVimeoId(url);
  if (vimeo) {
    const params = new URLSearchParams({ autoplay: '1', dnt: '1' });
    if (vimeo.hash) params.set('h', vimeo.hash);
    return {
      provider: 'vimeo',
      videoId: vimeo.id,
      embedUrl: `https://player.vimeo.com/video/${vimeo.id}?${params.toString()}`,
    };
  }

  return null;
}

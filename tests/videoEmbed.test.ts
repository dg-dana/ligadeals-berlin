import { getVideoEmbed } from '@/lib/video/embed'

describe('getVideoEmbed', () => {
  describe('YouTube', () => {
    it('parses a standard watch URL', () => {
      const embed = getVideoEmbed('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      expect(embed).toEqual({
        provider: 'youtube',
        videoId: 'dQw4w9WgXcQ',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
      })
    })

    it('parses a watch URL with extra query params in any order', () => {
      const embed = getVideoEmbed('https://youtube.com/watch?list=abc&v=dQw4w9WgXcQ&t=30s')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
      expect(embed?.provider).toBe('youtube')
    })

    it('parses a youtu.be short link (with a timestamp)', () => {
      const embed = getVideoEmbed('https://youtu.be/dQw4w9WgXcQ?t=42')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('parses a Shorts URL', () => {
      const embed = getVideoEmbed('https://www.youtube.com/shorts/dQw4w9WgXcQ')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('parses an already-embed URL', () => {
      const embed = getVideoEmbed('https://www.youtube.com/embed/dQw4w9WgXcQ')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('parses a live URL', () => {
      const embed = getVideoEmbed('https://www.youtube.com/live/dQw4w9WgXcQ')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('parses a mobile (m.youtube.com) URL', () => {
      const embed = getVideoEmbed('https://m.youtube.com/watch?v=dQw4w9WgXcQ')
      expect(embed?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('rejects a YouTube URL with no video id', () => {
      expect(getVideoEmbed('https://www.youtube.com/results?search_query=berlin')).toBeNull()
    })

    it('rejects a malformed (wrong-length) video id', () => {
      expect(getVideoEmbed('https://www.youtube.com/watch?v=tooShort')).toBeNull()
    })
  })

  describe('Vimeo', () => {
    it('parses a standard Vimeo URL', () => {
      const embed = getVideoEmbed('https://vimeo.com/123456789')
      expect(embed).toEqual({
        provider: 'vimeo',
        videoId: '123456789',
        embedUrl: 'https://player.vimeo.com/video/123456789?autoplay=1&dnt=1',
      })
    })

    it('parses an unlisted/private Vimeo URL and keeps the privacy hash', () => {
      const embed = getVideoEmbed('https://vimeo.com/123456789/abc123def')
      expect(embed?.videoId).toBe('123456789')
      expect(embed?.embedUrl).toContain('h=abc123def')
      expect(embed?.embedUrl).toContain('dnt=1')
    })

    it('parses a channel URL', () => {
      const embed = getVideoEmbed('https://vimeo.com/channels/staffpicks/123456789')
      expect(embed?.videoId).toBe('123456789')
    })

    it('parses a player.vimeo.com URL', () => {
      const embed = getVideoEmbed('https://player.vimeo.com/video/123456789')
      expect(embed?.videoId).toBe('123456789')
    })
  })

  describe('invalid input', () => {
    it('returns null for an empty string', () => {
      expect(getVideoEmbed('')).toBeNull()
    })

    it('returns null for a non-URL string', () => {
      expect(getVideoEmbed('not a url')).toBeNull()
    })

    it('returns null for an unsupported host', () => {
      expect(getVideoEmbed('https://example.com/video/123')).toBeNull()
    })
  })
})

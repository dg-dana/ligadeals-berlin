/**
 * RTL (Right-to-Left) Utility Functions
 *
 * Helper functions for RTL layout calculations and direction-aware operations
 * for Hebrew language support
 */

/**
 * Get the current text direction from the document
 */
export const getDirection = (): 'rtl' | 'ltr' => {
  if (typeof document === 'undefined') return 'rtl' // Default to RTL for Hebrew site
  return (document.documentElement.dir as 'rtl' | 'ltr') || 'rtl'
}

/**
 * Check if current direction is RTL
 */
export const isRTL = (): boolean => {
  return getDirection() === 'rtl'
}

/**
 * Flip a numeric value for RTL (e.g., margins, positions)
 * @param value - The value to flip
 * @returns The flipped value (positive becomes negative and vice versa)
 */
export const flipValue = (value: number): number => {
  return isRTL() ? -value : value
}

/**
 * Get the appropriate margin/padding property name for RTL
 * @param side - 'left' or 'right'
 * @returns 'right' in RTL when 'left' is passed, and vice versa
 */
export const getDirectionalSide = (side: 'left' | 'right'): 'left' | 'right' => {
  if (!isRTL()) return side
  return side === 'left' ? 'right' : 'left'
}

/**
 * Get the start side (left in LTR, right in RTL)
 */
export const getStartSide = (): 'left' | 'right' => {
  return isRTL() ? 'right' : 'left'
}

/**
 * Get the end side (right in LTR, left in RTL)
 */
export const getEndSide = (): 'left' | 'right' => {
  return isRTL() ? 'left' : 'right'
}

/**
 * Convert a translateX value for RTL
 * @param value - The translation value
 * @returns The direction-aware translation value
 */
export const getTranslateX = (value: number): number => {
  return isRTL() ? -value : value
}

/**
 * Get the appropriate transform-origin for RTL
 * @param origin - The LTR origin (e.g., 'left', 'right', 'center')
 * @returns The direction-aware origin
 */
export const getTransformOrigin = (origin: string): string => {
  if (!isRTL()) return origin

  if (origin.includes('left')) {
    return origin.replace('left', 'right')
  } else if (origin.includes('right')) {
    return origin.replace('right', 'left')
  }

  return origin
}

/**
 * Get the arrow direction for "next" in RTL context
 * In RTL: next = left arrow (←), previous = right arrow (→)
 */
export const getNextArrow = (): '←' | '→' => {
  return isRTL() ? '←' : '→'
}

/**
 * Get the arrow direction for "previous" in RTL context
 */
export const getPrevArrow = (): '←' | '→' => {
  return isRTL() ? '→' : '←'
}

/**
 * Flip border-radius for RTL (for asymmetric corners)
 * @param radius - Border radius value (e.g., "10px 0 0 10px")
 * @returns Flipped border radius for RTL
 */
export const flipBorderRadius = (radius: string): string => {
  if (!isRTL()) return radius

  const values = radius.split(' ')
  if (values.length === 4) {
    // top-left, top-right, bottom-right, bottom-left
    // In RTL: swap left and right
    return `${values[1]} ${values[0]} ${values[3]} ${values[2]}`
  }

  return radius
}

/**
 * Get box-shadow with flipped horizontal offset for RTL
 * @param shadow - Box shadow value (e.g., "2px 4px 6px rgba(0,0,0,0.1)")
 * @returns Direction-aware box shadow
 */
export const getBoxShadow = (shadow: string): string => {
  if (!isRTL()) return shadow

  // Parse shadow: offsetX offsetY blur spread color
  const parts = shadow.split(' ')
  if (parts.length >= 2) {
    const offsetX = parts[0]
    // Flip the horizontal offset
    const flippedX = offsetX.startsWith('-')
      ? offsetX.substring(1)
      : `-${offsetX}`

    return [flippedX, ...parts.slice(1)].join(' ')
  }

  return shadow
}

/**
 * Get text-align value for RTL
 * @param align - The desired alignment ('left', 'right', 'center')
 * @returns The direction-aware alignment
 */
export const getTextAlign = (align: 'left' | 'right' | 'center' | 'justify'): string => {
  if (align === 'center' || align === 'justify') return align
  if (!isRTL()) return align

  return align === 'left' ? 'right' : 'left'
}

/**
 * Get flex-direction for RTL rows
 * @param direction - The original flex direction
 * @returns The direction-aware flex direction
 */
export const getFlexDirection = (
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
): string => {
  if (!isRTL() || direction.includes('column')) return direction

  return direction === 'row' ? 'row-reverse' : 'row'
}

/**
 * Get animation direction for slide animations
 * @param from - Starting position ('left' or 'right')
 * @returns The direction-aware starting position
 */
export const getSlideFrom = (from: 'left' | 'right'): 'left' | 'right' => {
  if (!isRTL()) return from
  return from === 'left' ? 'right' : 'left'
}

/**
 * Create RTL-aware inline styles for an element
 * @param styles - Style object with potential directional properties
 * @returns Direction-aware styles object
 */
export const getRTLStyles = (styles: React.CSSProperties): React.CSSProperties => {
  if (!isRTL()) return styles

  const rtlStyles: React.CSSProperties = { ...styles }

  // Flip margins
  if (styles.marginLeft !== undefined) {
    rtlStyles.marginRight = styles.marginLeft
    delete rtlStyles.marginLeft
  }
  if (styles.marginRight !== undefined) {
    rtlStyles.marginLeft = styles.marginRight
    delete rtlStyles.marginRight
  }

  // Flip padding
  if (styles.paddingLeft !== undefined) {
    rtlStyles.paddingRight = styles.paddingLeft
    delete rtlStyles.paddingLeft
  }
  if (styles.paddingRight !== undefined) {
    rtlStyles.paddingLeft = styles.paddingRight
    delete rtlStyles.paddingRight
  }

  // Flip positioning
  if (styles.left !== undefined) {
    rtlStyles.right = styles.left
    delete rtlStyles.left
  }
  if (styles.right !== undefined) {
    rtlStyles.left = styles.right
    delete rtlStyles.right
  }

  // Flip text-align
  if (styles.textAlign === 'left') {
    rtlStyles.textAlign = 'right'
  } else if (styles.textAlign === 'right') {
    rtlStyles.textAlign = 'left'
  }

  return rtlStyles
}

/**
 * Get scroll direction multiplier for RTL
 * In RTL, scrollLeft works differently in some browsers
 */
export const getScrollMultiplier = (): number => {
  return isRTL() ? -1 : 1
}

/**
 * Normalize scroll position for RTL
 * Different browsers handle RTL scroll differently
 * @param scrollLeft - The scrollLeft value
 * @param scrollWidth - The scrollWidth of the element
 * @param clientWidth - The clientWidth of the element
 * @returns Normalized scroll position (0 = start, positive = scrolled)
 */
export const normalizeScrollPosition = (
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number
): number => {
  if (!isRTL()) return scrollLeft

  // In RTL, different browsers report scrollLeft differently:
  // - Chrome/Edge: negative values (0 to -maxScroll)
  // - Firefox: positive values (maxScroll to 0)
  // - Safari: positive values (0 to maxScroll)

  // Normalize to always return positive values from 0 to maxScroll
  if (scrollLeft < 0) {
    // Chrome/Edge behavior
    return Math.abs(scrollLeft)
  } else if (scrollLeft > 0 && scrollLeft < clientWidth) {
    // Firefox behavior
    return scrollWidth - clientWidth - scrollLeft
  }

  return scrollLeft
}

/**
 * Format Hebrew date
 * @param date - Date to format
 * @returns Formatted date in Hebrew locale
 */
export const formatHebrewDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format currency for Hebrew locale (Israeli Shekel)
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS'
  }).format(amount)
}

/**
 * Get the appropriate chevron icon for RTL
 * @param direction - 'left' or 'right'
 * @returns Tailwind class for chevron direction
 */
export const getChevronClass = (direction: 'left' | 'right'): string => {
  const actualDirection = isRTL()
    ? (direction === 'left' ? 'right' : 'left')
    : direction

  return actualDirection === 'left' ? 'rotate-180' : ''
}

/**
 * Utility for conditional RTL class names
 * @param rtlClass - Class to apply in RTL
 * @param ltrClass - Class to apply in LTR (optional)
 * @returns The appropriate class based on direction
 */
export const rtlClass = (rtlClass: string, ltrClass?: string): string => {
  return isRTL() ? rtlClass : (ltrClass || '')
}

/**
 * Get animation class for slide-in direction
 * @param from - Direction to slide from ('left', 'right', 'top', 'bottom')
 * @returns Tailwind animation class
 */
export const getSlideInClass = (from: 'left' | 'right' | 'top' | 'bottom'): string => {
  if (from === 'top' || from === 'bottom') return `slide-in-${from}`

  const direction = isRTL()
    ? (from === 'left' ? 'right' : 'left')
    : from

  return `slide-in-${direction}`
}

export default {
  getDirection,
  isRTL,
  flipValue,
  getDirectionalSide,
  getStartSide,
  getEndSide,
  getTranslateX,
  getTransformOrigin,
  getNextArrow,
  getPrevArrow,
  flipBorderRadius,
  getBoxShadow,
  getTextAlign,
  getFlexDirection,
  getSlideFrom,
  getRTLStyles,
  getScrollMultiplier,
  normalizeScrollPosition,
  formatHebrewDate,
  formatCurrency,
  getChevronClass,
  rtlClass,
  getSlideInClass
}

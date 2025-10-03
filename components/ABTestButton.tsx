'use client'

import { useState, useEffect } from 'react'
import { getVariant, trackConversion, ABTest, ABTestVariant } from '@/lib/ab-testing'

interface ABTestButtonProps {
  test: ABTest
  onClick?: () => void
  className?: string
  trackOnClick?: boolean // Track conversion on click (default: true)
}

/**
 * A/B Test CTA Button Component
 *
 * Example usage:
 * ```tsx
 * const ctaTest: ABTest = {
 *   testId: 'newsletter_cta',
 *   variants: [
 *     { id: 'variant_a', name: 'Original', value: 'הירשם לניוזלטר' },
 *     { id: 'variant_b', name: 'Urgent', value: 'הצטרף עכשיו!' },
 *     { id: 'variant_c', name: 'Benefit', value: 'קבל עדכונים בחינם' },
 *   ],
 *   conversionGoal: 'click'
 * }
 *
 * <ABTestButton test={ctaTest} onClick={handleSubscribe} />
 * ```
 */
export default function ABTestButton({
  test,
  onClick,
  className = '',
  trackOnClick = true
}: ABTestButtonProps) {
  const [variant, setVariant] = useState<ABTestVariant | null>(null)

  useEffect(() => {
    // Get variant on client-side only
    const selectedVariant = getVariant(test)
    setVariant(selectedVariant)
  }, [test])

  const handleClick = () => {
    if (trackOnClick && variant) {
      trackConversion(test.testId, variant.id)
    }
    onClick?.()
  }

  if (!variant) {
    // Show loading state or first variant as fallback
    return (
      <button
        className={className || 'bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'}
        disabled
      >
        {test.variants[0].value}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={className || 'bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'}
      data-test-id={test.testId}
      data-variant-id={variant.id}
    >
      {variant.value}
    </button>
  )
}

/**
 * A/B Testing Utility for CTA buttons and other elements
 *
 * This utility allows you to run A/B tests on different CTA button texts,
 * colors, or any other variants and track their performance.
 */

export interface ABTestVariant {
  id: string
  name: string
  value: string
  weight?: number // Optional weight for traffic distribution (default: 1)
}

export interface ABTest {
  testId: string
  variants: ABTestVariant[]
  conversionGoal?: string // e.g., 'click', 'submit', 'navigate'
}

const AB_TEST_STORAGE_KEY = 'ab_tests'
const AB_TEST_CONVERSIONS_KEY = 'ab_test_conversions'

/**
 * Get or assign a variant for a specific test
 */
export function getVariant(test: ABTest): ABTestVariant {
  if (typeof window === 'undefined') {
    return test.variants[0] // Server-side: return first variant
  }

  // Check if user already has an assigned variant
  const storage = localStorage.getItem(AB_TEST_STORAGE_KEY)
  const assignments = storage ? JSON.parse(storage) : {}

  if (assignments[test.testId]) {
    const variantId = assignments[test.testId]
    const variant = test.variants.find(v => v.id === variantId)
    if (variant) return variant
  }

  // Assign a new variant based on weights
  const variant = selectVariantByWeight(test.variants)

  // Store the assignment
  assignments[test.testId] = variant.id
  localStorage.setItem(AB_TEST_STORAGE_KEY, JSON.stringify(assignments))

  // Track the impression
  trackImpression(test.testId, variant.id)

  return variant
}

/**
 * Select a variant based on weight distribution
 */
function selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant {
  const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0)
  let random = Math.random() * totalWeight

  for (const variant of variants) {
    const weight = variant.weight || 1
    if (random < weight) {
      return variant
    }
    random -= weight
  }

  return variants[0] // Fallback
}

/**
 * Track an impression (when variant is shown)
 */
export function trackImpression(testId: string, variantId: string): void {
  if (typeof window === 'undefined') return

  const storage = localStorage.getItem(AB_TEST_CONVERSIONS_KEY)
  const data = storage ? JSON.parse(storage) : {}

  if (!data[testId]) {
    data[testId] = {}
  }
  if (!data[testId][variantId]) {
    data[testId][variantId] = { impressions: 0, conversions: 0 }
  }

  data[testId][variantId].impressions++
  localStorage.setItem(AB_TEST_CONVERSIONS_KEY, JSON.stringify(data))
}

/**
 * Track a conversion (when user completes the goal)
 */
export function trackConversion(testId: string, variantId?: string): void {
  if (typeof window === 'undefined') return

  // If variantId not provided, get it from assignments
  if (!variantId) {
    const storage = localStorage.getItem(AB_TEST_STORAGE_KEY)
    const assignments = storage ? JSON.parse(storage) : {}
    variantId = assignments[testId]
  }

  if (!variantId) return

  const storage = localStorage.getItem(AB_TEST_CONVERSIONS_KEY)
  const data = storage ? JSON.parse(storage) : {}

  if (!data[testId] || !data[testId][variantId]) {
    return
  }

  data[testId][variantId].conversions++
  localStorage.setItem(AB_TEST_CONVERSIONS_KEY, JSON.stringify(data))

  // Send to analytics (optional)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_conversion', {
      test_id: testId,
      variant_id: variantId,
    })
  }
}

/**
 * Get test results
 */
export function getTestResults(testId: string): Record<string, { impressions: number; conversions: number; conversionRate: number }> {
  if (typeof window === 'undefined') return {}

  const storage = localStorage.getItem(AB_TEST_CONVERSIONS_KEY)
  const data = storage ? JSON.parse(storage) : {}

  if (!data[testId]) return {}

  const results: Record<string, { impressions: number; conversions: number; conversionRate: number }> = {}

  for (const [variantId, stats] of Object.entries(data[testId])) {
    const typedStats = stats as { impressions: number; conversions: number }
    results[variantId] = {
      impressions: typedStats.impressions,
      conversions: typedStats.conversions,
      conversionRate: typedStats.impressions > 0
        ? (typedStats.conversions / typedStats.impressions) * 100
        : 0
    }
  }

  return results
}

/**
 * Reset a specific test
 */
export function resetTest(testId: string): void {
  if (typeof window === 'undefined') return

  // Remove assignment
  const assignmentStorage = localStorage.getItem(AB_TEST_STORAGE_KEY)
  if (assignmentStorage) {
    const assignments = JSON.parse(assignmentStorage)
    delete assignments[testId]
    localStorage.setItem(AB_TEST_STORAGE_KEY, JSON.stringify(assignments))
  }

  // Remove conversion data
  const conversionStorage = localStorage.getItem(AB_TEST_CONVERSIONS_KEY)
  if (conversionStorage) {
    const data = JSON.parse(conversionStorage)
    delete data[testId]
    localStorage.setItem(AB_TEST_CONVERSIONS_KEY, JSON.stringify(data))
  }
}

/**
 * Get all test results
 */
export function getAllTestResults(): Record<string, Record<string, { impressions: number; conversions: number; conversionRate: number }>> {
  if (typeof window === 'undefined') return {}

  const storage = localStorage.getItem(AB_TEST_CONVERSIONS_KEY)
  const data = storage ? JSON.parse(storage) : {}

  const results: Record<string, Record<string, { impressions: number; conversions: number; conversionRate: number }>> = {}

  for (const testId of Object.keys(data)) {
    results[testId] = getTestResults(testId)
  }

  return results
}

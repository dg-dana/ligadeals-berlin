#!/usr/bin/env node

/**
 * Accessibility Testing Script
 *
 * Automated accessibility testing using axe-core
 * Tests all major pages for WCAG 2.1 Level AA compliance
 *
 * Usage:
 *   npm run a11y              # Test all pages
 *   npm run a11y:ci           # Run in CI mode (fails on violations)
 */

const { AxePuppeteer } = require('@axe-core/puppeteer')
const puppeteer = require('puppeteer')

// Pages to test
const PAGES_TO_TEST = [
  { url: 'http://localhost:3000', name: 'Home' },
  { url: 'http://localhost:3000/blog', name: 'Blog' },
  { url: 'http://localhost:3000/contact', name: 'Contact' },
  { url: 'http://localhost:3000/gallery/photos', name: 'Photo Gallery' },
  { url: 'http://localhost:3000/recommendations', name: 'Recommendations' },
]

// Accessibility standards
const AXE_OPTIONS = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  }
}

// Severity levels
const SEVERITY = {
  CRITICAL: 'critical',
  SERIOUS: 'serious',
  MODERATE: 'moderate',
  MINOR: 'minor'
}

/**
 * Get color for severity level
 */
function getSeverityColor(impact) {
  switch (impact) {
    case SEVERITY.CRITICAL:
      return '\x1b[91m' // Bright red
    case SEVERITY.SERIOUS:
      return '\x1b[31m' // Red
    case SEVERITY.MODERATE:
      return '\x1b[33m' // Yellow
    case SEVERITY.MINOR:
      return '\x1b[36m' // Cyan
    default:
      return '\x1b[0m' // Reset
  }
}

/**
 * Format violation for display
 */
function formatViolation(violation, index) {
  const color = getSeverityColor(violation.impact)
  const reset = '\x1b[0m'

  console.log(`\n${color}${index + 1}. [${violation.impact.toUpperCase()}] ${violation.id}${reset}`)
  console.log(`   Description: ${violation.description}`)
  console.log(`   Help: ${violation.help}`)
  console.log(`   Help URL: ${violation.helpUrl}`)
  console.log(`   Impact: ${violation.impact}`)
  console.log(`   Elements affected: ${violation.nodes.length}`)

  violation.nodes.forEach((node, nodeIndex) => {
    console.log(`\n   Element ${nodeIndex + 1}:`)
    console.log(`   HTML: ${node.html}`)
    if (node.target && node.target.length > 0) {
      console.log(`   Selector: ${node.target.join(' > ')}`)
    }
    if (node.failureSummary) {
      console.log(`   Issue: ${node.failureSummary}`)
    }
  })
}

/**
 * Generate summary report
 */
function generateSummary(results) {
  const summary = {
    total: 0,
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0
  }

  results.forEach(result => {
    result.violations.forEach(violation => {
      summary.total++
      summary[violation.impact]++
    })
  })

  return summary
}

/**
 * Display summary
 */
function displaySummary(summary, passed) {
  console.log('\n' + '='.repeat(70))
  console.log('ACCESSIBILITY TEST SUMMARY')
  console.log('='.repeat(70))

  if (summary.total === 0) {
    console.log('\n✅ All tests passed! No accessibility violations found.')
  } else {
    console.log(`\n❌ Found ${summary.total} accessibility violations:`)
    if (summary.critical > 0) {
      console.log(`   🔴 Critical: ${summary.critical}`)
    }
    if (summary.serious > 0) {
      console.log(`   🟠 Serious: ${summary.serious}`)
    }
    if (summary.moderate > 0) {
      console.log(`   🟡 Moderate: ${summary.moderate}`)
    }
    if (summary.minor > 0) {
      console.log(`   🔵 Minor: ${summary.minor}`)
    }
  }

  console.log(`\nPages tested: ${passed}/${PAGES_TO_TEST.length}`)
  console.log('='.repeat(70) + '\n')
}

/**
 * Test a single page
 */
async function testPage(browser, pageInfo) {
  const page = await browser.newPage()

  try {
    console.log(`\nTesting: ${pageInfo.name} (${pageInfo.url})`)
    console.log('-'.repeat(70))

    // Navigate to page
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Run axe accessibility tests
    const results = await new AxePuppeteer(page)
      .options(AXE_OPTIONS)
      .analyze()

    // Display results
    if (results.violations.length === 0) {
      console.log(`✅ No accessibility violations found on ${pageInfo.name}`)
    } else {
      console.log(`\n❌ Found ${results.violations.length} violations on ${pageInfo.name}:`)
      results.violations.forEach((violation, index) => {
        formatViolation(violation, index)
      })
    }

    // Display passes (optional, for verbose mode)
    if (process.env.VERBOSE) {
      console.log(`\n✅ Passed ${results.passes.length} accessibility checks`)
    }

    await page.close()
    return results

  } catch (error) {
    console.error(`❌ Error testing ${pageInfo.name}:`, error.message)
    await page.close()
    return { violations: [], passes: [] }
  }
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🚀 Starting Accessibility Tests...\n')
  console.log('Testing for WCAG 2.1 Level AA compliance\n')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const results = []
  let passedPages = 0

  try {
    for (const pageInfo of PAGES_TO_TEST) {
      const result = await testPage(browser, pageInfo)
      results.push(result)

      if (result.violations.length === 0) {
        passedPages++
      }
    }

    // Generate and display summary
    const summary = generateSummary(results)
    displaySummary(summary, passedPages)

    // Exit with appropriate code
    if (summary.critical > 0 || summary.serious > 0) {
      console.log('❌ Critical or serious accessibility issues found. Please fix before deployment.\n')
      process.exit(1)
    } else if (summary.total > 0) {
      console.log('⚠️  Minor/moderate accessibility issues found. Consider fixing.\n')
      if (process.env.CI) {
        process.exit(1)
      } else {
        process.exit(0)
      }
    } else {
      console.log('✅ All accessibility tests passed!\n')
      process.exit(0)
    }

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// Run tests
runTests().catch(error => {
  console.error('Unhandled error:', error)
  process.exit(1)
})

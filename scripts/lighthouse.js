#!/usr/bin/env node

/**
 * Lighthouse Performance Testing Script
 *
 * This script runs automated Lighthouse tests to check:
 * - Performance
 * - Accessibility
 * - SEO
 * - Best Practices
 *
 * Usage:
 *   npm run lighthouse              # Run on localhost:3000
 *   npm run lighthouse:build        # Build and run tests
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    }
  }
};

const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1.6 * 1024,
      uploadThroughputKbps: 750,
    },
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 2.625,
      disabled: false,
    }
  }
};

// Target scores
const TARGET_SCORES = {
  performance: 90,
  accessibility: 95,
  'best-practices': 85,
  seo: 95
};

// URLs to test
const urls = [
  { url: 'http://localhost:3000', name: 'Home' },
  { url: 'http://localhost:3000/blog', name: 'Blog' },
  { url: 'http://localhost:3000/contact', name: 'Contact' },
  { url: 'http://localhost:3000/gallery/photos', name: 'Photo Gallery' },
];

async function launchChromeAndRunLighthouse(url, config) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options, config);

  await chrome.kill();

  return runnerResult;
}

async function saveReport(lhr, reportHtml, pageName, formFactor) {
  const reportsDir = path.join(process.cwd(), 'lighthouse-reports');

  try {
    await fs.mkdir(reportsDir, { recursive: true });
  } catch (err) {
    // Directory already exists
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${pageName.toLowerCase().replace(/\s+/g, '-')}-${formFactor}-${timestamp}.html`;
  const filepath = path.join(reportsDir, filename);

  await fs.writeFile(filepath, reportHtml);
  console.log(`📊 Report saved: ${filepath}`);

  return filepath;
}

function displayResults(lhr, pageName, formFactor) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 Page: ${pageName} (${formFactor.toUpperCase()})`);
  console.log(`${'='.repeat(60)}`);

  const categories = lhr.categories;
  let allPassed = true;

  Object.keys(categories).forEach((categoryId) => {
    const category = categories[categoryId];
    const score = Math.round(category.score * 100);
    const target = TARGET_SCORES[categoryId] || 0;
    const passed = score >= target;
    const icon = passed ? '✅' : '❌';

    if (!passed) allPassed = false;

    console.log(`${icon} ${category.title}: ${score}/100 (target: ${target})`);
  });

  console.log(`${'='.repeat(60)}\n`);

  return allPassed;
}

function displayOpportunities(lhr) {
  const audits = lhr.audits;
  const opportunities = [];

  // Key performance opportunities
  const keyMetrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'cumulative-layout-shift',
    'total-blocking-time',
    'speed-index'
  ];

  console.log('🎯 Key Performance Metrics:');
  console.log('─'.repeat(60));

  keyMetrics.forEach((metricId) => {
    const audit = audits[metricId];
    if (audit) {
      const value = audit.displayValue || audit.numericValue;
      const score = audit.score !== null ? Math.round(audit.score * 100) : 'N/A';
      console.log(`  ${audit.title}: ${value} (Score: ${score})`);
    }
  });

  console.log('─'.repeat(60));

  // Improvement opportunities
  const improvementAudits = Object.values(audits).filter(
    (audit) => audit.details && audit.details.type === 'opportunity' && audit.score < 1
  );

  if (improvementAudits.length > 0) {
    console.log('\n💡 Top Improvement Opportunities:');
    console.log('─'.repeat(60));

    improvementAudits
      .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
      .slice(0, 5)
      .forEach((audit) => {
        console.log(`  • ${audit.title}`);
        if (audit.displayValue) {
          console.log(`    Potential savings: ${audit.displayValue}`);
        }
      });

    console.log('─'.repeat(60));
  }
}

async function runTests() {
  console.log('🚀 Starting Lighthouse Performance Tests...\n');
  console.log('Target Scores:');
  Object.entries(TARGET_SCORES).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}+`);
  });
  console.log('\n');

  let allTestsPassed = true;
  const results = [];

  for (const { url, name } of urls) {
    // Desktop test
    try {
      console.log(`Testing ${name} (Desktop): ${url}`);
      const desktopResult = await launchChromeAndRunLighthouse(url, config);
      const desktopPassed = displayResults(desktopResult.lhr, name, 'desktop');
      displayOpportunities(desktopResult.lhr);

      await saveReport(desktopResult.lhr, desktopResult.report, name, 'desktop');

      results.push({
        page: name,
        formFactor: 'desktop',
        passed: desktopPassed,
        scores: {
          performance: Math.round(desktopResult.lhr.categories.performance.score * 100),
          accessibility: Math.round(desktopResult.lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(desktopResult.lhr.categories['best-practices'].score * 100),
          seo: Math.round(desktopResult.lhr.categories.seo.score * 100),
        }
      });

      if (!desktopPassed) allTestsPassed = false;
    } catch (err) {
      console.error(`❌ Error testing ${name} (Desktop):`, err.message);
      allTestsPassed = false;
    }

    // Mobile test
    try {
      console.log(`Testing ${name} (Mobile): ${url}`);
      const mobileResult = await launchChromeAndRunLighthouse(url, mobileConfig);
      const mobilePassed = displayResults(mobileResult.lhr, name, 'mobile');
      displayOpportunities(mobileResult.lhr);

      await saveReport(mobileResult.lhr, mobileResult.report, name, 'mobile');

      results.push({
        page: name,
        formFactor: 'mobile',
        passed: mobilePassed,
        scores: {
          performance: Math.round(mobileResult.lhr.categories.performance.score * 100),
          accessibility: Math.round(mobileResult.lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(mobileResult.lhr.categories['best-practices'].score * 100),
          seo: Math.round(mobileResult.lhr.categories.seo.score * 100),
        }
      });

      if (!mobilePassed) allTestsPassed = false;
    } catch (err) {
      console.error(`❌ Error testing ${name} (Mobile):`, err.message);
      allTestsPassed = false;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  results.forEach((result) => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.page} (${result.formFactor})`);
    console.log(`   P: ${result.scores.performance} | A: ${result.scores.accessibility} | BP: ${result.scores.bestPractices} | SEO: ${result.scores.seo}`);
  });

  console.log('='.repeat(60));

  if (allTestsPassed) {
    console.log('✅ All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed. Check the reports for details.');
    process.exit(1);
  }
}

// Check if we need to install chrome-launcher
(async () => {
  try {
    require.resolve('chrome-launcher');
    await runTests();
  } catch (err) {
    console.error('❌ chrome-launcher not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install chrome-launcher', { stdio: 'inherit' });
    console.log('✅ chrome-launcher installed. Please run the script again.');
    process.exit(1);
  }
})();

#!/usr/bin/env ts-node

/**
 * Pre-Deployment Verification Script
 * LigaDeals Berlin
 *
 * This script verifies that all required environment variables and configurations
 * are in place before deploying to production.
 */

import * as fs from 'fs';
import * as path from 'path';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Verification results
interface VerificationResult {
  category: string;
  checks: {
    name: string;
    passed: boolean;
    message: string;
    critical: boolean;
  }[];
}

const results: VerificationResult[] = [];

// Helper functions
function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message: string) {
  log(`✅ ${message}`, colors.green);
}

function error(message: string) {
  log(`❌ ${message}`, colors.red);
}

function warning(message: string) {
  log(`⚠️  ${message}`, colors.yellow);
}

function info(message: string) {
  log(`ℹ️  ${message}`, colors.cyan);
}

function section(title: string) {
  log(`\n${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.blue);
  log(`${colors.bold}${title}${colors.reset}`, colors.blue);
  log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.blue);
}

// Check if file exists
function fileExists(filePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

// Check environment variables from .env.example
function checkEnvVars(): VerificationResult {
  section('📝 Checking Environment Variables');

  const requiredVars = [
    { name: 'NEXT_PUBLIC_SANITY_PROJECT_ID', critical: true, description: 'Sanity Project ID' },
    { name: 'NEXT_PUBLIC_SANITY_DATASET', critical: true, description: 'Sanity Dataset' },
    { name: 'NEXT_PUBLIC_SANITY_STUDIO_URL', critical: true, description: 'Sanity Studio URL' },
    { name: 'SANITY_API_TOKEN', critical: true, description: 'Sanity API Token' },
    { name: 'SANITY_WEBHOOK_SECRET', critical: true, description: 'Sanity Webhook Secret' },
    { name: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', critical: true, description: 'Cloudinary Cloud Name' },
    { name: 'CLOUDINARY_API_KEY', critical: true, description: 'Cloudinary API Key' },
    { name: 'CLOUDINARY_API_SECRET', critical: true, description: 'Cloudinary API Secret' },
    { name: 'RESEND_API_KEY', critical: true, description: 'Resend API Key' },
    { name: 'RESEND_FROM_EMAIL', critical: true, description: 'Resend From Email' },
    { name: 'CONTACT_EMAIL', critical: true, description: 'Contact Email' },
    { name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID', critical: false, description: 'Google Analytics ID' },
    { name: 'NEXT_PUBLIC_SITE_URL', critical: false, description: 'Site URL' },
  ];

  const checks = requiredVars.map((varInfo) => {
    const exists = process.env[varInfo.name] !== undefined && process.env[varInfo.name] !== '';
    const passed = exists || !varInfo.critical;

    if (exists) {
      success(`${varInfo.description}: Set`);
    } else if (varInfo.critical) {
      error(`${varInfo.description}: Missing (CRITICAL)`);
    } else {
      warning(`${varInfo.description}: Missing (Optional)`);
    }

    return {
      name: varInfo.name,
      passed,
      message: exists ? 'Set' : 'Missing',
      critical: varInfo.critical,
    };
  });

  return { category: 'Environment Variables', checks };
}

// Check required files
function checkRequiredFiles(): VerificationResult {
  section('📁 Checking Required Files');

  const requiredFiles = [
    { path: 'package.json', critical: true, description: 'Package.json' },
    { path: 'next.config.ts', critical: true, description: 'Next.js Config' },
    { path: 'sanity.config.ts', critical: true, description: 'Sanity Config' },
    { path: '.gitignore', critical: true, description: 'Git Ignore' },
    { path: 'middleware.ts', critical: true, description: 'Middleware (Security)' },
    { path: 'app/api/contact/route.ts', critical: true, description: 'Contact API Route' },
    { path: 'app/api/revalidate/route.ts', critical: true, description: 'Revalidate API Route' },
    { path: '.env.example', critical: true, description: 'Environment Template' },
    { path: 'docs/deployment-guide.md', critical: false, description: 'Deployment Guide' },
    { path: 'docs/DEPLOYMENT_QUICK_START.md', critical: false, description: 'Quick Start Guide' },
  ];

  const checks = requiredFiles.map((file) => {
    const exists = fileExists(file.path);
    const passed = exists || !file.critical;

    if (exists) {
      success(`${file.description}: Found`);
    } else if (file.critical) {
      error(`${file.description}: Missing (CRITICAL)`);
    } else {
      warning(`${file.description}: Missing (Optional)`);
    }

    return {
      name: file.path,
      passed,
      message: exists ? 'Found' : 'Missing',
      critical: file.critical,
    };
  });

  return { category: 'Required Files', checks };
}

// Check package.json scripts
function checkPackageScripts(): VerificationResult {
  section('🔧 Checking Package.json Scripts');

  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    error('package.json not found!');
    return {
      category: 'Package Scripts',
      checks: [{
        name: 'package.json',
        passed: false,
        message: 'File not found',
        critical: true,
      }],
    };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const scripts = packageJson.scripts || {};

  const requiredScripts = [
    { name: 'dev', critical: true, description: 'Development Server' },
    { name: 'build', critical: true, description: 'Production Build' },
    { name: 'start', critical: true, description: 'Production Server' },
    { name: 'lint', critical: false, description: 'Linting' },
    { name: 'test', critical: false, description: 'Testing' },
  ];

  const checks = requiredScripts.map((script) => {
    const exists = scripts[script.name] !== undefined;
    const passed = exists || !script.critical;

    if (exists) {
      success(`${script.description}: ${scripts[script.name]}`);
    } else if (script.critical) {
      error(`${script.description}: Missing (CRITICAL)`);
    } else {
      warning(`${script.description}: Missing (Optional)`);
    }

    return {
      name: script.name,
      passed,
      message: exists ? 'Found' : 'Missing',
      critical: script.critical,
    };
  });

  return { category: 'Package Scripts', checks };
}

// Check Git status
function checkGitStatus(): VerificationResult {
  section('🔀 Checking Git Status');

  const checks = [];

  // Check if .git directory exists
  const gitExists = fileExists('.git');
  if (gitExists) {
    success('Git repository initialized');
    checks.push({
      name: 'Git Repository',
      passed: true,
      message: 'Initialized',
      critical: true,
    });
  } else {
    error('Git repository not initialized');
    checks.push({
      name: 'Git Repository',
      passed: false,
      message: 'Not initialized',
      critical: true,
    });
  }

  // Check .gitignore
  const gitignoreExists = fileExists('.gitignore');
  if (gitignoreExists) {
    const gitignoreContent = fs.readFileSync(path.join(process.cwd(), '.gitignore'), 'utf-8');
    const hasEnvIgnore = gitignoreContent.includes('.env');

    if (hasEnvIgnore) {
      success('.gitignore properly configured (ignoring .env files)');
      checks.push({
        name: '.gitignore',
        passed: true,
        message: 'Properly configured',
        critical: true,
      });
    } else {
      error('.gitignore missing .env exclusion');
      checks.push({
        name: '.gitignore',
        passed: false,
        message: 'Missing .env exclusion',
        critical: true,
      });
    }
  } else {
    error('.gitignore not found');
    checks.push({
      name: '.gitignore',
      passed: false,
      message: 'Not found',
      critical: true,
    });
  }

  return { category: 'Git Configuration', checks };
}

// Check security configurations
function checkSecurity(): VerificationResult {
  section('🔒 Checking Security Configuration');

  const checks = [];

  // Check middleware.ts
  const middlewareExists = fileExists('middleware.ts');
  if (middlewareExists) {
    const middlewareContent = fs.readFileSync(path.join(process.cwd(), 'middleware.ts'), 'utf-8');

    const hasRateLimiting = middlewareContent.includes('rate') || middlewareContent.includes('RATE_LIMIT');
    const hasCORS = middlewareContent.includes('CORS') || middlewareContent.includes('Access-Control');

    if (hasRateLimiting) {
      success('Rate limiting configured');
      checks.push({
        name: 'Rate Limiting',
        passed: true,
        message: 'Configured',
        critical: true,
      });
    } else {
      warning('Rate limiting not found in middleware');
      checks.push({
        name: 'Rate Limiting',
        passed: false,
        message: 'Not configured',
        critical: false,
      });
    }

    if (hasCORS) {
      success('CORS protection configured');
      checks.push({
        name: 'CORS Protection',
        passed: true,
        message: 'Configured',
        critical: true,
      });
    } else {
      warning('CORS protection not found in middleware');
      checks.push({
        name: 'CORS Protection',
        passed: false,
        message: 'Not configured',
        critical: false,
      });
    }
  } else {
    error('middleware.ts not found');
    checks.push({
      name: 'Middleware',
      passed: false,
      message: 'Not found',
      critical: true,
    });
  }

  // Check next.config.ts for security headers
  const nextConfigExists = fileExists('next.config.ts');
  if (nextConfigExists) {
    const nextConfigContent = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf-8');

    const hasSecurityHeaders = nextConfigContent.includes('X-Frame-Options') ||
                               nextConfigContent.includes('Strict-Transport-Security');

    if (hasSecurityHeaders) {
      success('Security headers configured in next.config.ts');
      checks.push({
        name: 'Security Headers',
        passed: true,
        message: 'Configured',
        critical: true,
      });
    } else {
      warning('Security headers not found in next.config.ts');
      checks.push({
        name: 'Security Headers',
        passed: false,
        message: 'Not configured',
        critical: false,
      });
    }
  }

  return { category: 'Security Configuration', checks };
}

// Print summary
function printSummary(results: VerificationResult[]) {
  section('📊 Verification Summary');

  let totalChecks = 0;
  let passedChecks = 0;
  let criticalFailures = 0;

  results.forEach((result) => {
    result.checks.forEach((check) => {
      totalChecks++;
      if (check.passed) {
        passedChecks++;
      } else if (check.critical) {
        criticalFailures++;
      }
    });
  });

  const percentage = Math.round((passedChecks / totalChecks) * 100);

  log(`\nTotal Checks: ${totalChecks}`);
  log(`Passed: ${passedChecks}`, colors.green);
  log(`Failed: ${totalChecks - passedChecks}`, colors.red);
  log(`Critical Failures: ${criticalFailures}`, colors.red);
  log(`Success Rate: ${percentage}%`, percentage === 100 ? colors.green : colors.yellow);

  if (criticalFailures > 0) {
    error('\n❌ DEPLOYMENT NOT READY - Critical failures detected!');
    error('Please fix the critical issues before deploying to production.\n');
    process.exit(1);
  } else if (passedChecks === totalChecks) {
    success('\n✅ ALL CHECKS PASSED - Ready for deployment! 🚀\n');
    process.exit(0);
  } else {
    warning('\n⚠️  DEPLOYMENT READY WITH WARNINGS');
    warning('Some optional checks failed, but you can proceed with deployment.');
    warning('Consider fixing the warnings for optimal configuration.\n');
    process.exit(0);
  }
}

// Main execution
async function main() {
  log(`\n${colors.bold}${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`);
  log(`${colors.bold}${colors.cyan}║   LigaDeals Berlin - Pre-Deployment Verification        ║${colors.reset}`);
  log(`${colors.bold}${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}\n`);

  info('Running pre-deployment checks...\n');

  // Load environment variables from .env.local if it exists
  if (fileExists('.env.local')) {
    info('Loading environment variables from .env.local...');
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
    envContent.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }

  // Run all checks
  results.push(checkEnvVars());
  results.push(checkRequiredFiles());
  results.push(checkPackageScripts());
  results.push(checkGitStatus());
  results.push(checkSecurity());

  // Print summary
  printSummary(results);
}

// Run the script
main().catch((error) => {
  error(`\n💥 Verification script failed: ${error.message}`);
  process.exit(1);
});

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const bundleCssPath = path.join(rootDir, 'assets/css/bundle.css');
const resetCssPath = path.join(rootDir, 'assets/css/global/reset.css');
const bundleJsPath = path.join(rootDir, 'assets/js/bundle.js');
const smoothScrollJsPath = path.join(rootDir, 'assets/js/global/smooth-scroll.js');

test('Scroll Audit: CSS must not have conflicting scroll-behavior smooth on html', () => {
  const bundleCss = fs.readFileSync(bundleCssPath, 'utf8');
  const resetCss = fs.readFileSync(resetCssPath, 'utf8');

  // Regex to check if html rule defines scroll-behavior: smooth
  const htmlSmoothRegex = /html\s*\{[^}]*scroll-behavior:\s*smooth/i;
  
  assert.strictEqual(
    htmlSmoothRegex.test(resetCss),
    false,
    'assets/css/global/reset.css still contains scroll-behavior: smooth on html, which breaks Lenis'
  );

  assert.strictEqual(
    htmlSmoothRegex.test(bundleCss),
    false,
    'assets/css/bundle.css still contains scroll-behavior: smooth on html, which breaks Lenis'
  );
});

test('Scroll Audit: Lenis CSS rules must be present in bundle.css to prevent browser smooth conflict', () => {
  const bundleCss = fs.readFileSync(bundleCssPath, 'utf8');
  
  assert.ok(
    bundleCss.includes('html.lenis') || bundleCss.includes('html.lenis-smooth'),
    'assets/css/bundle.css must define html.lenis / html.lenis-smooth'
  );
  assert.ok(
    bundleCss.includes('.lenis.lenis-smooth') && bundleCss.includes('scroll-behavior: auto !important'),
    'assets/css/bundle.css must define .lenis.lenis-smooth { scroll-behavior: auto !important; }'
  );
});

test('Scroll Audit: Smooth scroll JS must not run double RAF loop (requestAnimationFrame + gsap.ticker.add)', () => {
  const bundleJs = fs.readFileSync(bundleJsPath, 'utf8');
  const smoothJs = fs.readFileSync(smoothScrollJsPath, 'utf8');

  // Pattern that caused the double tick
  const doubleRafPattern = /requestAnimationFrame\(raf\)[\s\S]*gsap\.ticker\.add/;

  // Check smooth-scroll.js
  const hasDoubleRafSource = doubleRafPattern.test(smoothJs) && !smoothJs.includes('else');
  assert.strictEqual(
    hasDoubleRafSource,
    false,
    'assets/js/global/smooth-scroll.js has an unconditional double RAF loop running both requestAnimationFrame and gsap.ticker.add'
  );

  // Check bundle.js
  const hasDoubleRafBundle = doubleRafPattern.test(bundleJs) && !bundleJs.includes('else {\n      function raf');
  assert.strictEqual(
    hasDoubleRafBundle,
    false,
    'assets/js/bundle.js has an unconditional double RAF loop running both requestAnimationFrame and gsap.ticker.add'
  );
});

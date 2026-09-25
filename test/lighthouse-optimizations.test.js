const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const bundleCssPath = path.join(rootDir, 'assets/css/bundle.css');

test('Lighthouse Audit: Active site images in index.html must use modern WebP format', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Key images that Lighthouse flagged
  assert.ok(html.includes('logo-3-irmaos-sem-fundo.webp'), 'Header/Footer logo must use .webp');
  assert.ok(html.includes('hero-moto-160.webp'), 'Hero moto must use .webp');
  assert.ok(html.includes('foto-equipe-3-irmaos-premio.webp'), 'Team award photo must use .webp');
  assert.ok(html.includes('equipe-3-irmaos-premios-2.webp'), 'Team techs photo must use .webp');
  assert.ok(html.includes('services/revisao.webp'), 'Service revisao must use .webp');
  assert.ok(html.includes('services/injecao.webp'), 'Service injecao must use .webp');
  assert.ok(html.includes('services/motor.webp'), 'Service motor must use .webp');
  assert.ok(html.includes('services/oleo.webp'), 'Service oleo must use .webp');
  assert.ok(html.includes('reviews/moto-clean.webp'), 'Compare clean moto must use .webp');
  assert.ok(html.includes('reviews/moto-dirty.webp'), 'Compare dirty moto must use .webp');
  assert.ok(html.includes('gallery/gallery-1.webp'), 'Gallery 1 must use .webp');
  assert.ok(html.includes('gallery/gallery-2.webp'), 'Gallery 2 must use .webp');
});

test('Lighthouse Audit: Google Fonts must be non-render-blocking (preload + async media)', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Must have preload for the Google Fonts stylesheet
  assert.ok(
    html.includes('rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans'),
    'Google Fonts must have preload tag'
  );
  // Must have media="print" onload="this.media=\'all\'"
  assert.ok(
    html.includes('media="print" onload="this.media=\'all\'"'),
    'Google Fonts stylesheet must be loaded asynchronously with media="print" onload="this.media=\'all\'"'
  );
});

test('Lighthouse Audit: ARIA attributes on review-stars must include role="img"', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.strictEqual(
    html.includes('<div class="review-stars" aria-label='),
    false,
    'div.review-stars without role="img" has forbidden ARIA attribute according to Lighthouse'
  );
  assert.ok(
    html.includes('<div class="review-stars" role="img"'),
    'div.review-stars must have role="img"'
  );
});

test('Lighthouse Audit: Heading order must be sequential (h3 for review-name and footer-col-title)', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.strictEqual(
    html.includes('<h4 class="review-name">'),
    false,
    'h4.review-name skips h3 level under h2.ba-title'
  );
  assert.strictEqual(
    html.includes('<h4 class="footer-col-title">'),
    false,
    'h4.footer-col-title skips h3 level under h2.footer-title'
  );
  assert.ok(
    html.includes('<h3 class="review-name">'),
    'review-name must be h3'
  );
  assert.ok(
    html.includes('<h3 class="footer-col-title">'),
    'footer-col-title must be h3'
  );
});

test('Lighthouse Audit: CSS text contrast must pass WCAG AA (no #666 or #888 on dark/light surfaces)', () => {
  const bundleCss = fs.readFileSync(bundleCssPath, 'utf8');

  assert.strictEqual(
    bundleCss.includes('.review-meta {\n  font-family: var(--font-body);\n  font-size: 0.85rem;\n  color: #888;'),
    false,
    '.review-meta has failing low-contrast color #888'
  );
  assert.strictEqual(
    bundleCss.includes('.footer-copyright {\n  color: #666;'),
    false,
    '.footer-copyright has failing low-contrast color #666'
  );
});

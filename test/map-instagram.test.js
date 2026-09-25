const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const bundleCssPath = path.join(rootDir, 'assets/css/bundle.css');

test('Instagram Link Audit: Must point to official @oficina3irmaos19 with query parameters', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const expectedUrl = 'https://www.instagram.com/oficina3irmaos19?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';

  assert.ok(
    html.includes(expectedUrl),
    'index.html does not contain the updated Instagram URL'
  );
});

test('Google Maps Audit: iframe URL must be valid and responsive', async () => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract iframe src
  const match = html.match(/<div class="location-map-wrap">[\s\S]*?<iframe[\s\S]*?src="([^"]+)"/);
  assert.ok(match, 'iframe inside .location-map-wrap not found');
  const src = match[1];

  assert.strictEqual(
    src.includes('&#39;'),
    false,
    'Google Maps iframe src contains unescaped HTML entity &#39; which breaks query'
  );

  // Check HTTP status of the maps URL
  const res = await fetch(src);
  assert.strictEqual(
    res.status,
    200,
    `Google Maps embed URL returned status ${res.status}, expected 200 OK`
  );
});

test('Mobile Map CSS Audit: Must have robust height and interactive pointer-events', () => {
  const bundleCss = fs.readFileSync(bundleCssPath, 'utf8');

  // Must not have permanent pointer-events: none on all lenis-smooth iframes
  assert.strictEqual(
    bundleCss.includes('.lenis.lenis-smooth iframe {\n  pointer-events: none;\n}'),
    false,
    '.lenis.lenis-smooth iframe has permanent pointer-events: none, disabling map interaction on mobile'
  );

  // location-map-wrap must have explicit height for mobile
  assert.ok(
    bundleCss.includes('.location-map-wrap {') && (bundleCss.includes('height: 380px') || bundleCss.includes('height: 400px')),
    '.location-map-wrap must define explicit height for mobile rendering'
  );
});

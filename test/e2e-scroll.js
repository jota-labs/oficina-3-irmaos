const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const DEBUG_PORT = 9333;
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PUBLIC_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp'
};

// 1. Start local static HTTP server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  });
});

async function runTest() {
  server.listen(PORT);
  console.log(`[Test Server] Running on http://localhost:${PORT}`);

  // 2. Launch headless Edge with remote debugging
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--no-first-run',
    '--no-default-browser-check',
    `http://localhost:${PORT}/`
  ]);

  // Wait 1.5s for Edge to start
  await new Promise(r => setTimeout(r, 1500));

  try {
    // 3. Get debug target WebSocket URL from CDP
    const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`);
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === 'page');

    if (!pageTarget) {
      throw new Error("No page target found in Edge CDP");
    }

    console.log(`[CDP] Connecting to ${pageTarget.webSocketDebuggerUrl}`);
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise(resolve => ws.addEventListener('open', resolve));

    // Enable Runtime and Page domains
    await sendCommand('Runtime.enable');
    await sendCommand('Page.enable');

    // Wait for DOM & scripts to initialize
    await new Promise(r => setTimeout(r, 2000));

    // Check if Lenis and GSAP are loaded
    const evalLenis = await sendCommand('Runtime.evaluate', {
      expression: 'typeof window.lenis !== "undefined" && typeof gsap !== "undefined"'
    });
    console.log(`[Browser Check] window.lenis and GSAP loaded:`, evalLenis.result?.value);

    // Initial scroll position
    const initialPos = await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollY'
    });
    console.log(`[Scroll Check] Initial scrollY: ${initialPos.result?.value}`);

    // Simulate notebook trackpad / mouse wheel event (deltaY = 300)
    console.log(`[Scroll Action] Dispatching wheel scroll event (deltaY: 500)...`);
    await sendCommand('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 500,
      y: 500,
      deltaX: 0,
      deltaY: 500
    });

    // Wait 1 second for Lenis smooth scroll animation frames to complete
    await new Promise(r => setTimeout(r, 1200));

    const finalPos = await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollY'
    });
    console.log(`[Scroll Check] Final scrollY after wheel event: ${finalPos.result?.value}`);

    // Also test anchor link scrolling (e.g. clicking #servicos)
    console.log(`[Scroll Action] Testing anchor scroll to #servicos...`);
    await sendCommand('Runtime.evaluate', {
      expression: 'document.querySelector("a[href=\\"#servicos\\"]").click()'
    });

    // Wait 1.5s for smooth scroll to reach #servicos
    await new Promise(r => setTimeout(r, 1500));

    const anchorPos = await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollY'
    });
    console.log(`[Scroll Check] scrollY after clicking #servicos anchor: ${anchorPos.result?.value}`);

    ws.close();

    if (finalPos.result?.value > 0 && anchorPos.result?.value > 500) {
      console.log(`\n✅ E2E SCROLL TEST PASSED: Wheel scroll and anchor scroll are functioning smoothly without freezing!`);
      process.exitCode = 0;
    } else {
      console.error(`\n❌ E2E SCROLL TEST FAILED: Scroll remained at ${finalPos.result?.value} / ${anchorPos.result?.value}`);
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("Test Error:", err);
    process.exitCode = 1;
  } finally {
    edge.kill();
    server.close();
  }
}

runTest();

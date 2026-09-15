const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg"
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split("?")[0];

  if (reqUrl === "/" || reqUrl === "/demo" || reqUrl === "/demo/") {
    reqUrl = "/calc/demo/index.html";
  } else if (reqUrl === "/demo/index.html") {
    reqUrl = "/calc/demo/index.html";
  } else if (reqUrl === "/seo" || reqUrl === "/kalkulyator") {
    reqUrl = "/calc/seo/kalkulyator.html";
  } else if (!reqUrl.startsWith("/calc/")) {
    reqUrl = "/calc" + reqUrl;
  }

  const filePath = path.join(__dirname, reqUrl);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`404 Not Found: ${reqUrl}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[Localhost Server] Running at http://localhost:${PORT}/demo/index.html`);
});

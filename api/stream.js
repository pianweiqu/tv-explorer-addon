// TV Explorer Stremio Addon - Stream endpoint (Vercel Serverless Function)
// Stremio calls: /api/stream/<streamId>/<streamUrl>
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // req.url looks like: /api/stream/tv:1/cctv1.m3u8
  const parts = req.url.split('/').filter(Boolean); // ['api','stream','tv:1','cctv1.m3u8']
  const streamUrl = parts[3];

  try {
    const streams = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'stream.json'), 'utf8')
    );
    const result = streams[streamUrl];
    if (result) {
      res.end(JSON.stringify(result, null, 2));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Stream not found' }));
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message }));
  }
};

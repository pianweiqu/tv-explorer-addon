// TV Explorer Stremio Addon - Stream endpoint (Vercel Serverless Function)
// Stremio requests: /api/stream/tv/tv:1.json
// Vercel rewrite forwards the path as query param p (see vercel.json)
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const channels = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'channels.json'), 'utf8')
    );
    // p looks like: "tv/tv:1.json" (may have colon URL-encoded as %3A)
    let p = (req.query && req.query.p) || '';
    p = decodeURIComponent(p);
    // extract the content id, e.g. tv:1
    const match = p.match(/tv[:%3A][^.\s]+/i) || p.match(/([^/]+)\.json$/);
    let id = match ? match[0].replace(/\.json$/, '').replace(/%3A/i, ':') : '';
    if (!id.includes(':')) {
      // fallback: take last path segment without .json
      const seg = p.split('/').filter(Boolean).pop() || '';
      id = seg.replace(/\.json$/, '').replace(/%3A/i, ':');
    }

    const channel = channels.find((c) => c.id === id);
    if (channel) {
      res.end(JSON.stringify({
        streams: [
          {
            title: channel.name,
            url: channel.url,
            behaviorHints: { notWebReady: false }
          }
        ]
      }, null, 2));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ streams: [], error: 'Channel not found: ' + id }));
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message }));
  }
};

// TV Explorer Stremio Addon - Catalog endpoint (Vercel Serverless Function)
// Stremio requests: /api/catalog/tv/tv-top.json
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const channels = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'channels.json'), 'utf8')
    );
    const metas = channels.map((c) => ({
      id: c.id,
      type: 'tv',
      name: c.name,
      poster: c.poster,
      posterShape: 'landscape',
      background: c.poster
    }));
    res.end(JSON.stringify({ metas }, null, 2));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message }));
  }
};

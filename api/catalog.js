// TV Explorer Stremio Addon - Catalog endpoint (Vercel Serverless Function)
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'catalog.json'), 'utf8')
    );
    res.end(JSON.stringify(data, null, 2));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message }));
  }
};

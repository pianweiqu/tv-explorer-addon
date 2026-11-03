// TV Explorer Stremio Addon - Manifest endpoint (Vercel Serverless Function)
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    id: 'org.pianweiqu.tvexplorer',
    name: 'TV Explorer',
    version: '1.0.0',
    description: 'Watch 10,000+ Free Live TV Channels from TV Explorer',
    types: ['tv'],
    resources: ['catalog', 'stream'],
    catalogs: [
      {
        type: 'tv',
        id: 'tv-top',
        name: 'TV 热门'
      }
    ],
    idPrefixes: ['tv:'],
    behaviorHints: {
      live: true,
      adult: false
    }
  }, null, 2));
};

const http = require('http');
const fs = require('fs');
const path = require('path');

// 读取 catalog 数据
function getCatalog() {
  const catalogData = fs.readFileSync('./api/catalog.json', 'utf8');
  return JSON.parse(catalogData);
}

// 读取 stream 数据
function getStream(url, streamUrl) {
  const streamData = fs.readFileSync('./api/stream.json', 'utf8');
  return JSON.parse(streamData)[streamUrl];
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  let url = req.url;
  
  // 清理 URL
  url = url.replace(/^\//, '');
  
  // 处理 manifest.json 请求
  if (url === 'manifest.json' || url === '/') {
    const manifest = {
      name: 'TV Explorer',
      url: 'https://tvexplorer.live/',
      type: 'addon',
      version: '1.0.0',
      server: {
        url: 'http://localhost:3000/'
      },
      author: 'Pian Wei Qu',
      description: 'A TV channel aggregator addon for Stremio, powered by GitHub and iptv-org',
      icons: {
        default: 'https://pianweiqu.github.io/tv-explorer-addon/icon.png'
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(manifest, null, 2));
    return;
  }
  
  // 处理 catalog API
  if (url === 'api/catalog' || url === '/api/catalog') {
    const catalogs = getCatalog();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(catalogs, null, 2));
    return;
  }
  
  // 处理 stream API
  if (url.startsWith('api/stream/') || url.startsWith('/api/stream/')) {
    const parts = url.split('/');
    const apiPath = parts[1]; // 'stream'
    const streamId = parts[2]; // stream ID
    const streamUrl = parts[3]; // stream URL
    
    const streamInfo = getStream(streamId, streamUrl);
    
    if (streamInfo) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(streamInfo, null, 2));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Stream not found' }));
    }
    return;
  }
  
  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

// 启动服务器
server.listen(3000, '0.0.0.0', () => {
  console.log('TV Explorer API Server running at http://localhost:3000');
  console.log('Manifest: http://localhost:3000/manifest.json');
  console.log('Catalog: http://localhost:3000/api/catalog');
  console.log('Press Ctrl+C to stop the server');
});

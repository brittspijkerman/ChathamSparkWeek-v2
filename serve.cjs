const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = {'/':['index.html','text/html; charset=utf-8'], '/app.js':['app.js','text/javascript; charset=utf-8'], '/style.css':['style.css','text/css; charset=utf-8']};
const server = http.createServer((req,res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
  const item = files[pathname];
  if(req.method !== 'GET' || !item){res.writeHead(404);res.end('Not found');return;}
  try {const body=fs.readFileSync(path.join(__dirname,'preview',item[0]));res.writeHead(200,{'Content-Type':item[1],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"});res.end(body);} catch {res.writeHead(503);res.end('Build the prototype first.');}
});
server.listen(0,'127.0.0.1',()=>console.log('Local React preview: http://127.0.0.1:'+server.address().port+' (Ctrl+C to stop)'));

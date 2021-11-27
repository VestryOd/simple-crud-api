import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end();
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

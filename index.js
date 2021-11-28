import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // res.writeHead(200, {'Content-Type': 'application/json'});
  console.log('-----&&----');
  console.log("Url: " + req.url);
  console.log("Тип запроса: " + req.method);
  console.log("User-Agent: " + req.headers["user-agent"]);
  console.log("Все заголовки");
  console.log(req.headers);
  console.log('---------');
  res.end();
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

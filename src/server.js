import http from 'http';
import dotenv from 'dotenv';
import router from './resources/persons/router.js';

dotenv.config();

const server = http.createServer((req, res) => {
  // console.log("Url: " + req.url);
  // console.log("Тип запроса: " + req.method);
  // console.log("User-Agent: " + req.headers["user-agent"]);
  // console.log("Все заголовки");
  // console.log(req.headers);
  try {
    router(req, res);
  } catch(error) {
    console.error('server error:', error);
  }
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

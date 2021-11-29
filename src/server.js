import http from 'http';
import dotenv from 'dotenv';
import router from './resources/persons/router.js';

dotenv.config();

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Request, method ${method}, url: ${url}`);
  try {
    router(req, res);
  } catch(error) {
    console.error('server error:', error);
  }
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

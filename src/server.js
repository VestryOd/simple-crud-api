import http from 'http';
import dotenv from 'dotenv';
import personsRouter from './resources/persons/personsRouter';
console.log('--router', personsRouter);

dotenv.config();

const server = http.createServer((req, res) => {
  console.log('-----&&----');
  // console.log("Url: " + req.url);
  // console.log("Тип запроса: " + req.method);
  // console.log("User-Agent: " + req.headers["user-agent"]);
  // console.log("Все заголовки");
  // console.log(req.headers);
  // router(req, res);
  console.log('---------');
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

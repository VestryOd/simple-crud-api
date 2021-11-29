import http from 'http';
import dotenv from 'dotenv';
import Person from './src/resources/persons/model.js';

dotenv.config();

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // res.writeHead(200, {'Content-Type': 'application/json'});
  const person = new Person({ name: 'Jack', age: 40, hobbies: [] })
  console.log('-----&&----');
  console.log('--person', Person.validateFields({ name: 'hhh', 'hobbies': '' }));
  // console.log("Url: " + req.url);
  // console.log("Тип запроса: " + req.method);
  // console.log("User-Agent: " + req.headers["user-agent"]);
  // console.log("Все заголовки");
  // console.log(req.headers);
  console.log('---------');
  res.end();
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

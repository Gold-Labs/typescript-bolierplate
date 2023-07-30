import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

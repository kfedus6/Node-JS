const PORT = 3000;
const IP = '127.0.0.1';

const http = require('http'); //localhost

const system = require('./system');

const server = http.createServer((request, response) => {
   response.end(system.pcName);
})

server.listen(PORT, IP, () => {
   console.log(`Server start on ${PORT} port`)
})
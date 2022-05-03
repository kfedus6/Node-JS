import express from 'express';

const PORT = 3000;
const IP = '127.0.0.1';

const server = express()

server.use(express.json())

server.get('/api/getposts', (req, resp) => {
   resp.status(200).json({ 'id': 3, 'title': 'bmw', 'text': 'bmw best car' })
})

server.get('/api/users', (req, res) => {
   res.status(200).json([{ 'name': 'kolya', 'age': 22 }, { 'name': 'egor', 'age': 25 }, { 'name': 'dima', 'age': 12 }])
})

server.post('/api/adduser', (req, res) => {
   //Запись юзера бд
   res.status(200).json({ 'status': 'ok', 'title': req.body.title, 'text': req.body.text })
})

server.post('/api/addpost', (req, res) => {
   if (req.body.name === undefined) {
      res.status(404).json({ 'status': '404 Not Found', 'message': 'you not add name' });
   } else if (req.body.author === undefined) {
      res.status(404).json({ 'status': '404 Not Found', 'message': 'you not add author' });
   } else {
      res.status(200).json({ 'status': 'ok', 'name': req.body.name, 'author': req.body.author })
   }
})

server.listen(PORT, IP, () => {
   console.log(`Server start on ${PORT} port`)
})

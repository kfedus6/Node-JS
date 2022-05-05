/*
SELECT * FROM nameTable;
SELECT row,row FROM nameTable;
SELECT * FROM nameTable WHERE row = 'content';
add=(
   INSERT INTO post VALUES('Mazda',3,'JDISIOAJDIOASJDOIAJSODJAO')
   INSERT INTO post (id,title,text) VALUES(4,'Porshe','Porshmfksdmfksmdfksdmfs')
)
*/

/*
1) Создать таблицу юзер - id-int имя varchar. админ bool. токен varchar.
2) Реализовать апи запросы на создание юзера. получения имен юзеров. 
3) Реализовать апи запросы на создание поста. 
4) Обработка ошибок sql запросов
*/

import express from 'express';
import mysql2 from 'mysql2';

const PORT = 3000;
const IP = '127.0.0.1';

const connection = mysql2.createConnection({
   host: '127.0.0.1',
   post: '3306',
   user: 'root',
   password: '',
   database: 'blog'
});

const server = express()

server.use(express.json())

server.get('/api/getposts', (req, resp) => {
   const sql = 'SELECT * FROM post'
   connection.query(sql, (err, res) => {
      if (err) {
         res.status(500).json({ 'status': 'error', 'message': 'error db' });
      } else {
         resp.status(200).json({ 'status': 'ok', 'posts': res })
      }
   })
})

server.get('/api/users', (req, res) => {
   res.status(200).json([{ 'name': 'kolya', 'age': 22 }, { 'name': 'egor', 'age': 25 }, { 'name': 'dima', 'age': 12 }])
})

server.post('/api/adduser', (req, res) => {
   //Запись юзера бд
   res.status(200).json({ 'status': 'ok', 'title': req.body.title, 'text': req.body.text })
})

server.post('/api/addpost', (req, resp) => {
   /*
   if (req.body.name === undefined) {
      res.status(404).json({ 'status': '404 Not Found', 'message': 'you not add name' });
   } else if (req.body.author === undefined) {
      res.status(404).json({ 'status': '404 Not Found', 'message': 'you not add author' });
   } else {
      res.status(200).json({ 'status': 'ok', 'name': req.body.name, 'author': req.body.author })
   }*/
   const sql = "INSERT INTO post VALUES('fmsjfnsdfs',6,'sdvsdvsdvssd')"
   connection.query(sql, (err, res) => {
      if (err) {
         resp.status(500).json({ 'status': 'error', 'message': 'error db' });
      } else {
         resp.status(200).json({ 'status': 'ok' })
      }
   })
})

connection.connect((error) => {
   if (error) {
      console.log(error.message)
   } else {
      console.log('good')
   }
})

server.listen(PORT, IP, () => {
   console.log(`Server start on ${PORT} port`)
})

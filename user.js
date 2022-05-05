import express from "express";
import mysql2 from "mysql2";

const PORT = 3000;
const IP = '127.0.0.1';

const connection = mysql2.createConnection({
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: '',
   database: 'blog'
})

const server = express();

server.use(express.json());

server.get('/api/user', (req, res) => {
   const sql = "SELECT * FROM user";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

server.get('/api/username', (req, res) => {
   const sql = "SELECT name FROM user";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

server.post('/api/adduser', (req, res) => {
   const sql = "INSERT INTO user(id,name,admin) VALUES(4,'egor',false)";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

connection.connect((err) => {
   if (err) {
      console.log(err.message)
   } else {
      console.log('good')
   }
});

server.listen(PORT, IP, () => {
   console.log(`Server start on ${PORT} port`);
});

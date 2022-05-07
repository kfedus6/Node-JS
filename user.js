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

server.get('/api/users', (req, res) => {
   const sql = "SELECT * FROM user";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

server.get('/api/usernames', (req, res) => {
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
   //1 - неверный токен
   //2 - недостаточно прав
   const sqlToken = `SELECT admin FROM user WHERE token = "${req.body.token}"`;
   connection.query(sqlToken, (error, result) => {

      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
         return false;
      } else if (result.length == false) {
         res.status(400).json({ 'status': 'error', 'message': 'uncorrect token' })
      } else if (result[0].admin == true) {
         const sql = `INSERT INTO user(id,name,admin) VALUES(${req.body.id},"${req.body.name}",${req.body.admin})`;
         connection.query(sql, (err, resl) => {
            if (err) {
               res.status(505).json({ 'status': 'error', 'message': 'error db' });
               return false;
            } else {
               res.status(200).json({ 'status': 'Ok', 'user': resl });
            }
         })
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
})
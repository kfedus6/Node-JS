import express from "express";
import mysql2 from "mysql2";

function random(min, max) {
   return min + Math.random() * (max - min);
}

const token = () => {
   let token = '';
   for (let i = 0; i < 16; i++) {
      let value = random(48, 121)
      if (value == 63) value = random(48, 121)
      token += String.fromCharCode(value)
   }
   return token
}

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

/*
:id - req.params
getusers?token=fsdjnf2j3en&age=12 - req.query
{
   json  -   req.body
}
 */

//DELETE FROM namedb WHERE row = 'value'


server.delete('/api/deleteuser', (req, res) => {
   const sql = `DELETE FROM user WHERE name = "${req.query.name}"`;
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' })
      } else if (result.affectedRows == 0) {
         res.status(404).json({ 'status': 'error', 'message': 'not found user' })
      } else {
         res.status(200).json({ 'status': 'ok', 'user': result })
      }
   })
})

server.get('/api/users/:id/:title', (req, res) => {
   console.log(req.params)
   const sql = "SELECT * FROM user";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

server.get('/api/users', (req, res) => {
   //const { token, name, age } = req.query;
   //console.log(token, name, age)
   const sql = "SELECT * FROM user";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' });
      } else {
         res.status(200).json({ 'status': 'Ok', 'user': result });
      }
   })
});

server.get('/api/posts', (req, res) => {
   const sql = "SELECT * FROM post";
   connection.query(sql, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' })
      } else {
         res.status(200).json({ 'status': 'ok', 'post': result })
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
   const sqlToken = `SELECT admin FROM user WHERE token = "${req.body.user.token}"`;
   connection.query(sqlToken, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db1' });
         console.log(error.text)
         return false;
      } else if (result.length == false) {
         res.status(400).json({ 'status': 'error', 'message': 'uncorrect token' })
      } else if (result[0].admin == false) {
         res.status(400).json({ 'status': 'error', 'message': 'you are not admin' })
      } else if (result[0].admin == true) {
         const sql = `INSERT INTO user(id,name,admin,token) VALUES(${req.body.user.id},"${req.body.user.name}",${req.body.user.admin},"${token()}")`;
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

server.post('/api/addpost', (req, res) => {
   const sqlAdmin = `SELECT admin FROM user WHERE token ="${req.body.user.token}"`;
   connection.query(sqlAdmin, (error, result) => {
      if (error) {
         res.status(505).json({ 'status': 'error', 'message': 'error db' })
      } else if (result.length == false) {
         res.status(400).json({ 'status': 'error', 'message': 'uncorrect token' })
      } else if (result[0].admin == false) {
         res.status(200).json({ 'status': 'error', 'message': 'you are not admin' })
      } else if (result[0].admin == true) {
         const sql = `INSERT INTO post VALUES("${req.body.post.title}",${req.body.post.id},"${req.body.post.text}" )`;
         connection.query(sql, (error, result) => {
            if (error) {
               res.status(400).json({ 'status': 'error', 'message': 'error db' })
            } else {
               res.status(200).json({ 'status': 'ok', 'post': result })
            }
         })
      }
   })
});

server.post('/api/addposts', (req, res) => {
   req.body['posts'].forEach(item => {
      const sql = `INSERT INTO post VALUES("${item.title}, ${item.id}, "${item.text}")`;
      connection.query(sql, (error, result) => {
         if (error) {
            res.status(400).json({ 'status': 'error', 'message': 'error db' })
         } else {
            res.status(200).json({ 'status': 'ok', 'post': result })
         }
      })
   })
})

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
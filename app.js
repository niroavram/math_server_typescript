const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// const db = mysql.createConnection({
//     host: 'localhost',
//     user : 'root',
//     password: '',
// })

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "mathgames",
});


app.get('', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    console.log(`MySql connected to ${connection.threadId} `)

    connection.query('SELECT * from characters', (err,rows)=>{
        connection.release()

        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
  });
});

//delete record
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      console.log(`MySql connected to ${connection.threadId} `)
  
      connection.query('DELETE from characters WHERE id = ?',[req.params.id], (err,rows)=>{
          connection.release() // return the connection to pool
  
          if(!err){
              res.send(`The Character with the ID : ${[req.params.id]} has been removed`)
          }else{
              console.log(err)
          }
      })
    });
  });

  //add record
app.post('/addrecord', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      const params = req.body;
      console.log(`MySql connected to ${connection.threadId} `)
  
      connection.query('INSERT INTO characters SET ?',params, (err,rows)=>{
          connection.release() // return the connection to pool
  
          if(!err){
              res.send(`The Character with the ID : ${params.name} has been added`)
          }else{
              console.log(err)
          }
      })
    });
  });

   //update record
app.put('/updaterecord', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      const params = req.body;
      const {id, name, image_url,type,type_action} = req.body
      console.log(`MySql connected to ${connection.threadId} `)
  
      connection.query('UPDATE characters SET name = ? WHERE id = ?',[name,id], (err,rows)=>{
          connection.release() // return the connection to pool
  
          if(!err){
              res.send(`The Character with the ID : has been added`)
          }else{
              console.log(err)
          }
      })
    });
  });


// db.connect((err)=>{
//     if(err){
//         console.log(err)
//         throw err;
//     }
//     console.log("MySql Connected...")
// })


app.get("/cdb", (req, res) => {
  let sql = "CREATE DATABASE mathGames";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created... ");
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

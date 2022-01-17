const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser')
const characterRoute = require('./routes/Characters')
const mathActionRoute = require('./routes/MathActions')


const PORT = process.env.PORT || 5000;

const app = express({req: express.Request, res: express.Response});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/api/character", characterRoute);
app.use("/api/mathaction", mathActionRoute);



const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "mathgames",
});


// app.get('', (req: Request, res: Response) => {
//   pool.getConnection((err:string, connection: {threadI: number, query: boolean,rea }) => {
//     if (err) {
//       throw err;
//     }
//     console.log(`MySql connected to ${connection.threadI} `)

//     connection.query('SELECT * from characters', (err: string,rows: )=>{
//         connection.release()

//         if(!err){
//             res.send(rows)
//         }else{
//             console.log(err)
//         }
//     })
//   });
// });

// //delete record
// app.delete('/:id', (req, res) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         throw err;
//       }
//       console.log(`MySql connected to ${connection.threadId} `)
  
//       connection.query('DELETE from characters WHERE id = ?',[req.params.id], (err,rows)=>{
//           connection.release() // return the connection to pool
  
//           if(!err){
//               res.send(`The Character with the ID : ${[req.params.id]} has been removed`)
//           }else{
//               console.log(err)
//           }
//       })
//     });
//   });

//   //add record
// app.post('/addrecord', (req, res) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         throw err;
//       }
//       const params = req.body;
//       console.log(`MySql connected to ${connection.threadId} `)
  
//       connection.query('INSERT INTO characters SET ?',params, (err,rows)=>{
//           connection.release() // return the connection to pool
  
//           if(!err){
//               res.send(`The Character with the ID : ${params.name} has been added`)
//           }else{
//               console.log(err)
//           }
//       })
//     });
//   });

//    //update record
// app.put('/updaterecord', (req, res) => {
//     pool.getConnection((err: string, connection) => {
//       if (err) {
//         throw err;
//       }
//       const params = req.body;
//       const {id, name, image_url,type,type_action} = req.body
//       console.log(`MySql connected to ${connection.threadId} `)
  
//       connection.query('UPDATE characters SET name = ? WHERE id = ?',[name,id], (err,rows)=>{
//           connection.release() // return the connection to pool
  
//           if(!err){
//               res.send(`The Character with the ID : has been added`)
//           }else{
//               console.log(err)
//           }
//       })
//     });
//   });


// db.connect((err)=>{
//     if(err){
//         console.log(err)
//         throw err;
//     }
//     console.log("MySql Connected...")
// })



app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

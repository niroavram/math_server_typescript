import express ,{Request,Response}  from "express";
import { type } from "os";
import { isParameter } from "typescript";
import { Connect, QueryJson, QueryArr } from "../config/mysql";


const getAllCharacters =(req: Request, res: Response) =>{
    let query = 'SELECT * FROM `character`'
    let params = {}
    Connect()
    .then(connection => {
        QueryArr(connection,query,params)
        .then(results=>{
            res.status(200).json({results})
        })
        .catch(err=>{
            return res.status(500).json({
                message: "One or more params incorret",
                err: err
            })
    })
    .catch(err=>{
        return res.status(500).json({
            message: "connection lost"
        })
    })
    .finally(()=>{
        connection.end();
    })

})
}
type Character = {
    id?: number,
    name?: string,
    image_url?: string,
    type?: string
}
const addCharacter =(req: Request, res: Response) =>{
    let query = 'INSERT INTO `character` SET ?'
    let params = req.body
    Connect()
    .then(connection => {
        QueryJson(connection,query,params)
        .then(results=>{
            res.status(200).json({results})
        })
        .catch(err=>{
            return res.status(500).json({
                message: "params problem"
            })
    })
    .catch(err=>{
        return res.status(500).json({
            message: "catch me"
        })
    })
    .finally(()=>{
        connection.end();
    })

})
}

const removeCharacter =(req: Request, res: Response) =>{
    let query = 'DELETE from `character` WHERE id = ?'
    let params = req.body
    Connect()
    .then(connection => {
        QueryArr(connection,query,params)
        .then(results=>{
            res.status(200).json({results})
        })
        .catch(err=>{
            return res.status(500).json({
                message: "params problem"
            })
    })
    .catch(err=>{
        return res.status(500).json({
            message: "catch me"
        })
    })
    .finally(()=>{
        connection.end();
    })

})
}

  //delete record
//   app.delete('/:id', (req, res) => {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           throw err;
//         }
//         console.log(`MySql connected to ${connection.threadId} `)
    
//         connection.query('DELETE from characters WHERE id = ?',[req.params.id], (err,rows)=>{
//             connection.release() // return the connection to pool
    
//             if(!err){
//                 res.send(`The Character with the ID : ${[req.params.id]} has been removed`)
//             }else{
//                 console.log(err)
//             }
//         })
//       });
//     });
  

const updateCharacter =(req: Request, res: Response) =>{
    let query = 'UPDATE `character` SET name = ? WHERE id = ?'
    let params = req.body
    Connect()
    .then(connection => {
        QueryArr(connection,query,params)
        .then(results=>{
            res.status(200).json({results})
        })
        .catch(err=>{
            return res.status(500).json({
                message: "params problem"
            })
    })
    .catch(err=>{
        return res.status(500).json({
            message: "catch me"
        })
    })
    .finally(()=>{
        connection.end();
    })

})
}

  


  
//      //update record
//   app.put('/updaterecord', (req, res) => {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           throw err;
//         }
//         const params = req.body;
//         const {id, name, image_url,type,type_action} = req.body
//         console.log(`MySql connected to ${connection.threadId} `)
    
//         connection.query('UPDATE characters SET name = ? WHERE id = ?',[name,id], (err,rows)=>{
//             connection.release() // return the connection to pool
    
//             if(!err){
//                 res.send(`The Character with the ID : has been added`)
//             }else{
//                 console.log(err)
//             }
//         })
//       });
//     });



export {getAllCharacters,addCharacter, removeCharacter, updateCharacter}
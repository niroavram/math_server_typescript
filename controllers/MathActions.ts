import express ,{Request,Response}  from "express";
import { type } from "os";
import { isParameter } from "typescript";
import { Connect, QueryJson, QueryArr } from "../config/mysql";


const getAllMathACtions =(req: Request, res: Response) =>{
    let query = 'SELECT * FROM `math_action`'
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

export {getAllMathACtions}
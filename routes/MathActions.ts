import express ,{Request,Response}  from "express";
import {Connection} from "mysql"
import {getAllMathACtions} from "../controllers/MathActions"

 const router =  express.Router();

 router.get('/getAllMathAction', getAllMathACtions);


module.exports = router;


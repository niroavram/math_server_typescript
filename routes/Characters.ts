import express ,{Request,Response}  from "express";
import {Connection} from "mysql"
import {getAllCharacters,addCharacter} from "../controllers/Characters"

 const router =  express.Router();

 router.get('/getAllCharacter', getAllCharacters);
 router.post('/addCharacter', addCharacter);


module.exports = router;

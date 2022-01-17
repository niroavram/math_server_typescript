import mysql, { Types } from "mysql";

const ConnectionParams = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "mathgames",
};

type Character = {
 id: number,
 name: string,
 image_url: string,
 type: string
}

type allTheParams = {
    id?: number,
    name?: string,
    image_url?: string,
    type?: string,
    email?: string
   }

const Connect = async () =>
  new Promise<mysql.Pool>((resolve, reject) => {
    const connection = mysql.createPool(ConnectionParams);
    connection.getConnection((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
      console.log(`MySql connected to ${ConnectionParams.database}`);
    });
  });

  const QueryArr = async (connection: mysql.Pool, query: string, params: allTheParams) =>  new Promise((resolve, reject) =>{
        let values = Object.values(params)
        console.log(params)
        connection.query(query,params,(error,result)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(result);
        })

  });

//   app.post('/addrecord', (req, res) => {
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

  const QueryJson = async (connection: mysql.Pool, query: string, params: allTheParams) =>  new Promise((resolve, reject) =>{
    let values = Object.values(params)

        connection.query(query,params, (error,result)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(result);
            console.log(result)
        })
    
});


  export {Connect , QueryArr, QueryJson}

const express = require('express');
const db =require('../db')
var cors = require('cors')
// const client =require('./redis/index')
const router=require('./user/routes')
const app = express();
const port = 3000;
app.use(express.urlencoded({'extended':true}))
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// app.get('/', async(req, res) => {
//  const chunk=await client.get('todo')
//  console.log(chunk)
//  if(chunk){
// return res.json(JSON.parse(chunk))

//  }
//  else{
//   const response=await axios()
//   console.log(response.data)
//   try{
//     await client.set('todo',JSON.stringify(response.data))
//     await client.expire('todo',30)
//   return res.json(response.data)}
//   catch(err){
//     console.log(err)
//   }
//  }

// });
app.use('/api/v1/user',router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

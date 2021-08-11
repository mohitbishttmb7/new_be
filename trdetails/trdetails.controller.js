const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const bcrypt = require('bcryptjs');
const config = require('config.json');
const { MongoClient } = require('mongodb');
const authorize = require('_middleware/authorize');
const BodyParser = require("body-parser");
const { Collection } = require('mongoose');
const CONNECTION_URL = config.connectionString;
const DATABASE_NAME = "myFirstDatabase";

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection_trDetails = database.collection("trDetails");
    // console.log("Connected to `" + DATABASE_NAME + "`!");
});
// router.post("/addUser",(req,res)=>{
//     // create test user if the username is empty
//     var query = { username: req.body.username };
//     collection_user.find(query).toArray((err,result1)=>{
// 		if (err) throw err;
//          var getQuery = result1;
//     if (getQuery.length === 0) {
//         const user = new db.User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
//             role: req.body.role,
//             branch:req.body.branch
//         });
//        const save =  user.save((error,result)=>{
//            if(error){
//             return res.status(500).send(error);
//            }
//            res.send(result.result);
//        });
//     }else{
//         return res.status(404).send("User already exist!")
//    }
//    });
// });
router.post("/addtrDetails", (request, response) => {
     
    var query = { truckNo: request.body.truckNo };
	collection_trDetails.find(query).toArray((err,result1)=>{
		if (err) throw err;
         var getQuery = result1;
        //  console.log(getQuery);
     if(getQuery.length === 0){
        collection_trDetails.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });}else{
               return response.status(500).send("Truck already exist!")
          }
        console.log(getQuery.length);
    });
});/*employees att post */

// router.post("/addEmployee_att", (request, response) => {
//     var nowDate = new Date(); 
//     var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
//     var query = { date: request.body.date, emp_id: request.body.emp_id };
// 	collection_att.find(query).toArray((err,result1)=>{
// 		if (err) throw err;
//          var getQuery = result1;
//         //  console.log(getQuery);
//      if(getQuery.length === 0){
//     collection_att.insertOne(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });}else{
//                return response.status(500).send("Attendance already exist!")
//           }
//         /*console.log(getQuery.length);*/
//     });
// });

// /*remove employee*/
// router.delete("/removeEmployee/:userName",(req,res)=>{
//     collection.deleteOne(req.params,(err,result)=>{
//     if(err){
//         return res.status(404).send(err)
//     }res.send(result);
// });
// });
/*update employee*/
router.post("/updatetrDetails",(req,res)=>{
   let dbQuery ={truckNo:req.body.truckNo};
   let updateSet = {$set:req.body};
    collection_trDetails.updateOne(dbQuery,updateSet,(err,result)=>{
    if(err){
        return res.status(404).send(err)
    }res.status(200).send(result);
    });
});
/*data get*/
 router.get("/getTrDetails", (request, response) => {
    collection_trDetails.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
/*get attendance*/
//  router.get("/getEmployee_att", (request, response) => {
//     collection_att.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });




module.exports = router;
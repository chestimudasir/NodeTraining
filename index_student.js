const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());

const url = 'mongodb://chesti_mudasir:tMB4cONoXtUqrp6a@cluster0-shard-00-00-xgpxg.gcp.mongodb.net:27017,cluster0-shard-00-01-xgpxg.gcp.mongodb.net:27017,cluster0-shard-00-02-xgpxg.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const port = 8000;
const student_routes = require('C:/Users/hp/express/routes/student_routes.js');

mongoose.connect(url, {useNewUrlParser: true}).then(()=> {
   console.log("database Connected");
}).catch(error => console.log(error.message));

app.use('/', student_routes.js);

app.listen(port, ()=> console.log(`listening to port ${port} and Database Connected`));
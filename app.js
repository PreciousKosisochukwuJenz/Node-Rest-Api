const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const productRoute = require("./api/routes/productsRoute");
const orderRoute = require("./api/routes/ordersRoute");

// init express
const app = express();

mongoose.connect("mongodb://localhost/NodeRestAPI");
const db = mongoose.connection;

// check for db connection
db.once("open",()=>{
    console.log("Database connection opened")
});

// check for db error
db.on("error",(err)=>{
    console.log(err);
})

//Handle loggging
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((request,response,next)=>{
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");

    if(request.method === "OPTIONS"){
        response.header("Access-Control-Allow-Methods","PUT,POST,DELETE,PATCH,GET");
        response.status(200).json({});
    }

    next();
})

//Handle routes
app.use("/products",productRoute);
app.use("/orders",orderRoute);

// Handle errors
app.use((request,response,next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error,request,response,next)=>{
   response.status(error.status || 500);
   response.json({
       error : error.message
   })
});

module.exports = app;
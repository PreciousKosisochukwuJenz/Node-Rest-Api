const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/Product")

router.get("/",(request, response,next)=>{

    Product.find()
    .exec()
    .then(doc => {
        console.log(doc);
        response.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        response.status(500).json({error : err});
    })
});

router.post("/",(request, response,next)=>{

    const product = new Product({
        _id : new  mongoose.Types.ObjectId,
        name : request.body.name,
        price : request.body.price
    });

    product.save().then((result)=> {
        console.log(result);
        response.status(201).json({
            message : "Product created",
            productCreated : result
        });
    }).catch((error)=>{
        console.log(error);
        response.status(500).json({error: error})
    });
});

router.get("/:productId",(request, response,next)=>{
    const id = request.params.productId;
    Product.findById(id).exec()
    .then(doc => {console.log(doc);
        if(doc){
            response.status(200).json(doc);
        }else{
            response.status(404).json({message : "No data found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({
            error : err
        });
    });
});

router.patch("/:productId",(request,response)=>{
    const query = {_id : request.params.productId};
    const product = {
        name : request.body.name,
        price : request.body.price
    };

    // for(const op of request.body){
    //     product[op.propname] = product[op.value]
    // };
    console.log(product);
    Product.update(query,product)
    .exec()
    .then(result => {
        console.log(result);
        response.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({error: err});
    });
});


router.delete("/:productId",(request, response,next)=>{
    const id = request.params.productId;

    Product.findById(id)
    .then(result =>{
        Product.remove(result)
        .exec()
        .then(()=>{
            response.status(200).json({message: "Product removed successfully."});
        })
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({error : err})
    });
}); 

module.exports = router;
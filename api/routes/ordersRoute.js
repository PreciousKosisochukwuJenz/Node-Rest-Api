const express = require("express");
const router  =  express.Router();
const Order = require("../models/Order")


router.get("/",(request,response,next)=>{
    Order.find()
    .select("quantity")
    .populate("Product","name price")
    .then(results =>{
        console.log(results);
        response.status(200).json(results);
    })
    .catch(err =>{
        console.log(err);
        response.status(500).json({error : err});
    })
});

router.post("/",(request,response,next)=>{
    const order = new Order({
        quantity : request.body.quantity,
        product : request.body.product
    });
    order.save(order)
    .then(result =>{
        console.log(result);
        response.status(201).json({message: "saved successfully."})
    }).catch(err =>{
        console.log(err);
        response.status(500).json({error : err})
    })
    response.status(201).json({
        message: "Order created",
        order : order
    })
});

router.get("/:orderId",(request,response,next)=>{
    const id = request.params.orderId;

    Order.findById(id)
    .populate("Product","name price")
    .select("quantity")
    .exec()
    .then(result => {
        console.log(result);
        response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        response.status(500).json({error : err});
    })
});
router.delete("/:orderId",(request,response,next)=>{
    response.status(200).json({
        message: "Order deleted",
        orderId : request.params.orderId
    }) 
});

module.exports = router;
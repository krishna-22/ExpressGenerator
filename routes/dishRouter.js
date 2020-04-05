const express = require('express')
const bodyparser = require('body-parser')
const dishRouter = express.Router()
const mongoose = require('mongoose')
const Dishes = require('../models/dishes')


dishRouter.use(bodyparser.json())

dishRouter.route('/')
.get((req,res,next)=>
{
        Dishes.find({})
        .then((dishes)=>{
            res.statusCode=200
            res.setHeader('content-Type','application/json')
            res.json(dishes) // updates body with dishes and updates res.end with it
        },(err)=>next(err))
        .catch((err)=>next(err));    
})
.post((req,res)=>
{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log('inserted ',dish)
        res.statusCode=200
        res.setHeader('content-Type','application/json')
        res.json(dish) // updates body with dishes and updates res.end with it
    },(err)=>next(err))
    .catch((err)=>next(err));  
    })

.put((req,res)=>
{
    res.statusCode=403
    res.end('put operation is not supported on dishes')
}) 

.delete((req,res)=>
{
    Dishes.remove({})
    .then((resp)=>{
        console.log('deleted ',dish)
        res.statusCode=200
        res.setHeader('content-Type','application/json')
        res.json(resp) // updates body with dishes and updates res.end with it
    },(err)=>next(err))
    .catch((err)=>next(err));  

}) ;

dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true }) //new true will return updated dish
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;

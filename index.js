const express = require('express')
const db = require('./service/db')

const server = express()

const cors = require('cors')
const logic = require('./service/logic')


//connect with frontend
server.use(cors({ origin: 'http://localhost:3000' }))

server.use(express.json())

//port setting for server

server.listen(8000, () => {
    console.log("server started at port 8000");
})

server.post('/addproduct', (req, res) => {
    logic.addProduct(req.body.id, req.body.name, req.body.description, req.body.price, req.body.image,req.body.category,req.body.quantity)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
server.get('/viewalldessert',(req,res)=>{
    logic.allProduct().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.get('/getAnItem/:id',(req,res)=>{
    logic.getAnItem(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)

    })
})
server.post('/editproduct',(req,res)=>{
    logic.editproduct(req.body.id,req.body.name,req.body.description,req.body.price,req.body.image,req.body.category,req.body.quantity).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.delete('/deleteproduct/:id',(req,res)=>{
    logic.deleteProduct(req.params.id).then(result=>{
        res.json(result)
    })
})
server.get('/getAcategory/:category',(req,res)=>{
    logic.getAcategory(req.params.category).then(result=>{
        res.status(result.statusCode).json(result)

    })
})
server.post('/signup',(req,res)=>{
    logic.signup(req.body.uname,req.body.email,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/login',(req,res)=>{
    logic.login(req.body.email,req.body.password).then(result=>{
        res.json(result)
    })
})

// server.post('/orderData',(req,res)=>{
//     logic.orderData(req.body.email,req.body.order_data,req.body.order_date).then(result=>{
//         res.json(result)
//     })
// })
server.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await db.Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await db.Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await db.Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

// server.post('/myOrderData', async (req, res) => {
//     try {
//         console.log(req.body.email)
//         let eId = await db.Order.findOne({ 'email': req.body.email })
//         //console.log(eId)
//         res.json({orderData:eId})
//     } catch (error) {
//         res.send("Error",error.message)
//     }
    

// });

server.post('/myOrderData',(req,res)=>{
    console.log("in index.js of myOrderData");
    logic.myOrderData(req.body.email).then(result=>{
        res.json(result)
    })
})

server.post('/allOrderData',(req,res)=>{
    logic.allOrderData().then(result=>{
        res.json(result)
    })
})

// server.post('/addtocart',(req,res)=>{
//     console.log("in addtocart");
//     logic.addtocart(req.body.email,req.body.id,req.body.orderqty,req.body.orderprice).then(result=>{
//         res.json(result)

//     })
// })
// server.post('/getusercart',(req,res)=>{
//     console.log("in index.js of getusercart")
//     console.log(req.body.email);
//     logic.getusercart(req.body.email).then(result=>{
//         res.json(result)

//     })
// })
// server.post('/removefromcart',(req,res)=>{
//     console.log("in removefromcart index.js");
//     logic.removefromcart(req.body.id,req.body.email).then(result=>{
//         res.json(result)

//     })
// })
// server.post('/updatecart',(req,res)=>{
//     console.log("in updatecart index.js");
//     logic.updatecart(req.body.email,req.body.ind,req.body.cart).then(result=>{
//         res.json(result)

//     })
// })

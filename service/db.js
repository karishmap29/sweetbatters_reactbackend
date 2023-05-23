const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/sweetBatters',{useNewUrlParser:true})

//model for dessert items
const Dessert = mongoose.model('Dessert', {
    id: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category:String,
    quantity:String
   
})
//model for customers
const User = mongoose.model('User',{
    uname: String,
    email: String,
    password: String,
    orders:[],
    cart:[]
})
//model for orders
const Order = mongoose.model('Order',{
    email: String,
    order_data:[]
})



module.exports={
    Dessert,User,Order
}
const db = require('./db')


const addProduct = (id, name, description, price, image, category, quantity) => {
    return db.Dessert.findOne({ id }).then(result => {
        if (result) {
            return {
                statusCode: 404,
                message: "Dessert already exist"
            }
        }
        else {
            //create obj of employee model for new employee
            const newDessert = new db.Dessert({
                id,
                name,
                description,
                image,
                price,
                category,
                quantity
            })
            //save the obj in db
            newDessert.save()
            return {
                statusCode: 200,
                message: "Dessert added successfully",
                image,
                name
            }
        }
    })
}

const allProduct = () => {
    return db.Dessert.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                desserts: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "no data is available"
            }
        }
    })
}
const getAnItem = (id) => {
    console.log("in getAnItem logic.js");
    return db.Dessert.findOne({ id }).then(result => {
        if (result) {
            return {
                statusCode: 200,
                dessert: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "no data is available"
            }
        }
    })
}

const editproduct = (id, name, description, price, image, category, quantity) => {
    return db.Dessert.findOne({ id }).then(result => {
        if (result) {
            result.id = id,
                result.name = name,
                result.description = description,
                result.price = price,
                result.image = image,
                result.category = category,
                result.quantity = quantity

            result.save()
            return {
                statusCode: 200,
                message: "Details Updated"
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'product not found!!'
            }
        }
    })
}

const deleteProduct = (id) => {
    return db.Dessert.deleteOne({ id }).then(result => {
        if (result) {
            return {
                statusCode: 200,
                message: "Product deleted"
            }

        }
        else {
            return {
                statusCode: 404,
                message: 'Product not found'
            }
        }
    })
}

const getAcategory = (category) => {

    return db.Dessert.find({ category }).then(result => {
        if (result) {
            return {
                statusCode: 200,
                desserts: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "no data is available"
            }
        }
    })
}

const signup = (uname, email, password) => {
    return db.User.findOne({ email }).then(result => {
        if (result) {
            return {
                statusCode: 404,
                message: 'email id already present!!'
            }
        }
        else {
            newuser = new db.User({
                uname,
                email,
                password,
                orders: [],
                cart: []
            })
            newuser.save()
            return {
                statusCode: 200,
                message: 'User registration successfull!'
            }
        }
    })
}

const login = (email, password) => {
    return db.User.findOne({ email, password }).then(result => {
        if (result) {
            return {
                status: 'true',

                message: 'login successful',
                email,
                uname: result.uname,
                orders: result.orders,
                cart: result.cart
            }
        }
        else {
            return {
                status: 'false',

                message: 'Incorrect email or password!'
            }
        }
    })
}

const addtocart = (email, id, orderqty, orderprice) => {
    return db.User.findOne({ email }).then(user => {
        if (user) {
            user.cart.push({ id, orderqty, orderprice })
            user.save()
            return {
                status: 'true',
                statusCode: 200,
                message: 'added to cart',
                user
            }
        }
    })
}

const getusercart = (email) => {
    return db.User.findOne({ email }).then(user => {
        if (user) {
            console.log("in logic.js of getusercart");
            return {
                user,
                status: 'true',
                message: "from getusercart"

            }
        }
    })
}

// const orderData = (email, order_data, order_date) => {
//     let data = order_data
//     //  data.splice(0,0,{order_date:order_date})
//     console.log("1231242343242354", email)

//     //if email not exisitng in db then create: else: InsertMany()
//     return db.Order.findOne({ email }).then(eId => {
//         if (eId === null) {
//             console.log(data)
//             console.log("1231242343242354",email)
//             db.Order.create({
//                 email,
//                 // order_data: {data,order_date}
//                 order_data:data,order_date

//             })

//             return {
//                 success: 'true',
//                 message: 'successfully added to orders'
//             }
//         }

//         else {
//            eId.order_data.push({data:order_data,order_date})

//            eId.save()
//            return{
//             message:'successfully updated the order'
//            }
//         }
//     })

// }

// const orderData = (email, order_data, order_date) => {
//     let data = order_data
//     data = data.splice(0, 0, { order_date })
//     return db.Order.findOne({ email }).then(eId => {
//         if (!eId) {
//             db.Order.create({
//                 email,
//                 order_data: [data]
//             })
//         }
//         else {
//             return db.Order.findOneAndUpdate({ email: req.body.email },
//                 { $push: { order_data: data } })
//         }
//     })
// }



//if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })



const myOrderData = (email) => {
    return db.Order.findOne({ email }).then(eId => {
        if (eId) {
            console.log(eId);

            return {
                success:'true',
                orderData: eId
                // message: 'successfully retrieved data'
            }
        }
        else{
            return{
                success:'false'

            }
        }
    })
}


const allOrderData = ()=>{
    return db.Order.find().then(eId =>{
        if(eId){
            console.log(eId);
            return{
                AllData:eId
            }
        }
    })

}




const removefromcart = (id, email) => {
    return db.User.findOne({ email }).then(user => {
        if (user) {
            wanted_id = id
            newcart = user.cart

            let l = newcart.length
            for (i = 0; i < l; i++) {
                if (newcart[i].id == wanted_id) {
                    index = i;
                }
            }
            newcart.splice(index, 1)
            db.User.updateOne({ email }, { "$set": { "cart": newcart } })
            user.save()
            console.log(user.cart);

        }
    })
}

const updatecart = (email, ind, cart) => {
    return db.User.findOne({ email }).then(user => {
        if (user) {

            user.cart[ind] = cart

            user.save()

            console.log(user);
            return {
                status: 'true',

            }
        }
    })
}


module.exports = {
    addProduct,
    allProduct,
    getAnItem,
    editproduct,
    deleteProduct,
    getAcategory,
    signup,
    login,
    addtocart,
    getusercart,
    removefromcart,
    updatecart,
    myOrderData,
    allOrderData
}
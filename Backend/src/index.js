const express = require('express');
const db = require('../db/db')
const { updateField } = require('./utils')
 
const app = express();
const port = 3000;
const productRouter = express.Router();




app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
}) 

productRouter.post("/create", (req, res) => {
    const product = req.body;
    const newId = db.products[db.products.length - 1].id + 1;

    product.id = newId;
   
    db.products.push(product)
    db.total++

    res.status(200).json(product)
})

productRouter.get("/total", (req, res) => {
    res.status(200).json(db.total)
})

productRouter.get("/pagination/:id", (req, res) => {
    const page = Number(req.params.id);
    
    if (page < 1) {
         res.status(400).json()
    }
    const end = page * 10;
    const start = end - 10;
 
  
    const data = db.products.slice(start, end)
 

    res.status(200).json(data)
    
})

productRouter.put("/title/:id", (req, res) => {
    const { title } = req.body;

    const product = updateField(Number(req.params.id), req.path, title)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.put("/description/:id", (req, res) => {
    const { description } = req.body;

    const product = updateField(Number(req.params.id), req.path, description)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.put("/price/:id", (req, res) => {
    const { price } = req.body;

    const product = updateField(Number(req.params.id), req.path, price)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.put("/stock/:id", (req, res) => {
    const { stock } = req.body;

    const product = updateField(Number(req.params.id), req.path, stock)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.put("/brand/:id", (req, res) => {
    const { brand } = req.body;

    const product = updateField(Number(req.params.id), req.path, brand)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.put("/category/:id", (req, res) => {
    const { category } = req.body;

    const product = updateField(Number(req.params.id), req.path, category)
    
    if (!product) {
        res.status(400).json()
    }

    res.status(200).json(product)
})

productRouter.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    let deleteProduct = null
    

    db.products = db.products.filter(product => {
        if (product.id === id) {
            deleteProduct = product
            return false
        }
        return true
    })


    db.total--

    if (!deleteProduct) {
        res.status(400).json()
    }
 
     
    res.status(200).json(deleteProduct)

})
 
app.use('/products', productRouter)
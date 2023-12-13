const express = require('express');
const db = require('../db/db');
const cors = require('cors');

const app = express();
const port = 5000;
const productRouter = express.Router();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

productRouter.post('/', (req, res) => {
  const product = req.body;
  const newId = db.products[db.products.length - 1].id + 1;

  product.id = newId;

  db.products.push(product);
  db.total++;

  res.status(200).json(product);
});

productRouter.get('/total', (req, res) => {
  res.status(200).json(db.total);
});

productRouter.get('/pagination/:id', (req, res) => {
  const page = Number(req.params.id);

  if (page < 1) {
    res.status(400).json();
  }
  const end = page * 10;
  const start = end - 10;

  const data = db.products.slice(start, end);

  res.status(200).json(data);
});

productRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  let deleteProduct = null;

  db.products = db.products.filter((product) => {
    if (product.id === id) {
      deleteProduct = product;
      return false;
    }
    return true;
  });

  db.total--;

  if (!deleteProduct) {
    res.status(400).json();
  }

  res.status(200).json(deleteProduct);
});

productRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
  } = req.body;

  //   if (!title && !description && !price && !discountPercentage && !rating && !stock && !bra)

  for (const product of db.products) {
    if (product.id === id) {
      product.title = title ? title : product.title;
      product.description = description ? description : product.description;
      product.price = price ? price : product.price;
      product.discountPercentage = discountPercentage
        ? discountPercentage
        : product.discountPercentage;
      product.rating = rating ? rating : product.rating;
      product.stock = stock ? stock : product.stock;
      product.brand = brand ? brand : product.brand;
      product.category = category ? category : product.category;

      return res.status(200).json(product);
    }
  }
  res.status(400).json();
});

productRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  for (const product of db.products) {
    if (product.id === id) {
      return res.status(200).json(product);
    }
  }

  res.status(400).json();
});
app.use('/products', productRouter);

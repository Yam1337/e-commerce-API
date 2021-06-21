const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser());
app.use(cors());

const products = require("./products.json");
const categories = require("./categories.json");
const orders = require("./orders.json");

app.get("/products", (req, res) => {
  const limit = req.query._limit;
  if (limit !== undefined) {
    const limitedProducts = products.slice(0, Number(limit));
    res.json(limitedProducts);
    return;
  }
  res.json(products);
});

app.get("/products/count", (req, res) => {
  const countId = Number(req.query._countId);
  if (countId !== undefined) {
    const itemsCount = products.filter((item) => item.category.id === countId)
      .length;
    res.json(itemsCount);
    return;
  }
  const itemsCount = products.filter((item) => item.category.id > 0).length;
  res.json(itemsCount);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = products.find((item) => item.id === id);
  res.json(found);
});

app.get("/categories", (req, res) => {
  const id = req.query._id;
  const limit = req.query._limit;
  if (id !== undefined && limit !== undefined) {
    const found = products.filter((item) => item.category.id === Number(id));
    const limitedProducts = found.slice(0, Number(limit));
    res.json(limitedProducts);
    return;
  }
  if (id !== undefined) {
    const found = products.filter((item) => item.category.id === Number(id));
    res.json(found);
    return;
  }
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = categories.find((item) => item.id === id);
  res.json(found);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", (req, res) => {
  console.log(req.body);
  orders.push(req.body);
  res.send(req.body, orders);
});

app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = orders.find((item) => item.id === id);
  res.json(found);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

console.log("Yes, this is dog");

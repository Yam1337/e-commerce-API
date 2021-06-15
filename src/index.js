const express = require("express");
const app = express();
const port = 3000;

const products = require("./products.json");
const categories = require("./categories.json");
const orders = require("./orders.json");

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = products.find((item) => item.id === id);
  res.json(found);
});

app.get("/categories", (req, res) => {
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

app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = orders.find((item) => item.id === id);
  res.json(found);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

console.log("Yes, this is dog");

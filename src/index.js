const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const e = require("cors");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Hello Worlds");
});
app.get("/product/:id", async (req, res) => {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
        where: {
            id : parseInt(productId),
        }
    });

    if(!product){
        return res.status(404).send('Data Tidak ditemukan');
    }

    res.status(200).send(product);
})
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});
app.post("/product", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      Image: newProductData.image,
    },
  });
  res.status(200).send("Create Product Succes");
});
app.put("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  if (!(productData.name && productData.price && productData.description && productData.Image)) {
    return res.status(400).send("some fields are missing");
  }
  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      Image: productData.image,
    },
  });
  res.status(200).send({
    data: product,
    messege: "edit data success",
  });
});
app.patch("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      Image: productData.image,
    },
  });
  res.status(200).send({
    data: product,
    messege: "edit data success",
  });
});
app.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.status(200).send("product delate by id: " + productId);
});

app.listen(PORT, () => {
  console.log("Express API Running in PORT:" + PORT);
});

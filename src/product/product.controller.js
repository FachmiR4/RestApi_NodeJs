// layer untuk handle request dan response
// Biasanya juga handle validation body

const express = require("express");
const router = express.Router();
const { getAllDataProduct, getAllDataProductById, insertDataProduct, editDataProduct, deleteDataProduct } = require("./product.service");
const prisma = require("../db/index");

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getAllDataProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const products = await getAllDataProduct();
    res.send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await insertDataProduct(newProductData);
    res.status(200).send("Create Product Succes");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    if (!(productData.name && productData.price && productData.description && productData.Image)) {
      throw Error("some fields are missing");
    }
    const product = await editDataProduct(productId, productData);
    res.status(200).send({
      data: product,
      messege: "edit data success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await editDataProduct(productId, productData);
    res.status(200).send({
      data: product,
      messege: "edit data success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteDataProduct(productId);
    res.status(200).send("product delete");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

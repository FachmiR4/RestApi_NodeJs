// service layaer bertujuan untuk handle business logic
// kenapa dipisah? supaya tanggung jawabnya ter-isolate, dan functions-nya reusable
const prisma = require("../db/index");

const getAllDataProduct = async () => {
  const product = await prisma.product.findMany();
  if (!product) {
    throw new Error("data tidak ada");
  }
  return product;
};
const getAllDataProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!product) {
    throw new Error("Data Tidak ditemukan");
  }
  return product;
};
const insertDataProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      Image: productData.image,
    },
  });
  return product;
};
const editDataProduct = async (id, productData) => {
  const dataProduct = await getAllDataProductById(id);
  if (!dataProduct) {
    throw new Error("product tidak ada");
  }
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      Image: productData.image,
    },
  });
  return product;
};
const deleteDataProduct = async (id) => {
  const dataProduct = await getAllDataProductById(id);
  if (!dataProduct) {
    throw new Error("data product tidak ada");
  }
  const product = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  return product;
};
module.exports = {
  getAllDataProduct,
  getAllDataProductById,
  insertDataProduct,
  editDataProduct,
  deleteDataProduct,
};

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const requiredFields = ["id", "name", "description", "price", "stock"];

    const hasMissingField = requiredFields.some(
      (field) =>
        product[field] === undefined ||
        product[field] === null ||
        product[field] === ""
    );

    if (hasMissingField) {
      console.error("Error: faltan campos obligatorios.");
      return;
    }

    const productExists = this.products.some(
      (existingProduct) => existingProduct.id === product.id
    );

    if (productExists) {
      console.error("Error: el ID ya existe.");
      return;
    }

    this.products.push(product);
    console.log(`Producto "${product.name}" agregado correctamente.`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.log("Not found");
      return;
    }

    return product;
  }
}

module.exports = ProductManager;
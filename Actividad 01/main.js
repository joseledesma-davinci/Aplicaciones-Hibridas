const ProductManager = require("./ProductManager");

const manager = new ProductManager();

// Agregar productos válidos
manager.addProduct({
  id: 1,
  name: "Teclado",
  description: "Teclado mecánico",
  price: 25000,
  stock: 25
});

manager.addProduct({
  id: 2,
  name: "Mouse",
  description: "Mouse inalámbrico",
  price: 12000,
  stock: 40
});

manager.addProduct({
  id: 3,
  name: "Monitor",
  description: "Monitor LED de 24 pulgadas",
  price: 180000,
  stock: 10
});

// Consultar todos los productos
console.log("\nTodos los productos:");
console.log(manager.getProducts());

// Buscar un producto existente
console.log("\nProducto con ID 2:");
console.log(manager.getProductById(2));

// Buscar un producto inexistente
console.log("\nProducto con ID 99:");
console.log(manager.getProductById(99));

// Intentar agregar un producto con campos faltantes
console.log("\nProducto con campo faltante:");
manager.addProduct({
  id: 4,
  name: "Auriculares",
  description: "Auriculares Bluetooth",
  price: 30000
});

// Intentar agregar un producto con ID repetido
console.log("\nProducto con ID repetido:");
manager.addProduct({
  id: 1,
  name: "Parlante",
  description: "Parlante portátil",
  price: 45000,
  stock: 15
});
const fs = require("fs");
class Contendor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }
  save = async (product) => {
    try {
      //leer si existe el archivo
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8"); //leo el archivo
        if (contenido) {
          //si tiene contenido, agrego
          const productos = JSON.parse(contenido);
          //verificar si el producto existe

          const newProduct = {
            id: productos.length + 1,
            ...product,
          };
          productos.push(newProduct);
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(productos, null, 2)
          );
        } else {
          //si no tiene contenido, creo el contenido.
          const newProduct = {
            ...product,
            id: 1,
          };

          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newProduct], null, 2)
          );
        }

        console.log(contenido);
      } else {
        //si no existe, creamos archivo(tampoco existe el producto)
        //creamos un nuevo producto a partir del product parametro, con sus caracteristicas, pero separando el id para manejarlo mejor
        const newProduct = {
          ...product,
          id: 1,
        };

        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([newProduct], null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (id) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        if (contenido) {
          const productos = JSON.parse(contenido);
          const producto = productos.find((item) => item.id === id);
          return producto;
        } else {
          return "El archivo esta vacio";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAll = async () => {
    const contenido = await fs.promises.readFile(this.nameFile, "utf8");
    const productos = JSON.parse(contenido);
    return productos;
  };
  deleteById = async (id) => {
    const contenido = await fs.promises.readFile(this.nameFile, "utf8");
    const productos = JSON.parse(contenido);
    const nuevoArray = productos.filter((item) => item !== id);
    await fs.promises.writeFile(
      this.nameFile,
      JSON.stringify([nuevoArray], null, 2)
    );
  };
  deleteAll = async () => {
    await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2));
  };
}

//Crea la instancia
const listaProductos = new Contendor("nombreArchivo.txt");
console.log(listaProductos);

const producto1 = {
  title: "camisa",
  precio: "$100",
  thumbnail:
    "https://st.depositphotos.com/1377864/2368/i/450/depositphotos_23680273-stock-photo-blue-shirt-isolated-on-white.jpg",
};
const producto2 = {
  title: "zapatos",
  precio: "$1000",
  thumbnail:
    "https://st.depositphotos.com/1377864/2368/i/450/depositphotos_23680273-stock-photo-blue-shirt-isolated-on-white.jpg",
};

const crearProducto = async () => {
  await listaProductos.save(producto1);
  await listaProductos.save(producto2);
  const resultadoId = await listaProductos.getById(1);
  console.log(resultadoId);
  const productos = await listaProductos.getAll();
  console.log(productos);
  const deleteById = await listaProductos.deleteById(2);
  console.log(deleteById);
  await listaProductos.deleteAll;
};
crearProducto();

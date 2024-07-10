import { CreateProductDto } from '../dto/createProduct.dto';
import { UpdateProductDto } from '../dto/updateProduct.dto';
import Product, { IProduct } from '../models/product.model';


const findAllProducts = async (): Promise<IProduct[]> => {
  const products = await Product.findAll();
  return products;
};

const insertProduct = async (bodyProduct: CreateProductDto): Promise<IProduct> => {
  const { nombre, precio, stock, proveedor_id, categoria_id } = bodyProduct;
  const product = await Product.create({
    nombre,
    precio, 
    stock, 
    proveedor_id, 
    categoria_id
  });

  return product;
};

const getByIdProduct = async (id: number): Promise<IProduct | string> => {
  const product = await Product.findOne({ where: { producto_id: id } });
  if (!product) {
    return 'No se encuentra Id';
  }
  return product;
};

const updateByIdProduct = async (id: number, bodyProduct: UpdateProductDto): Promise<IProduct | string> => {
  const { nombre, precio, stock, proveedor_id, categoria_id } = bodyProduct;
  const findProduct = await Product.findOne({ where: { producto_id: id } });
  if (!findProduct) {
    return 'No se encuentra Id';
  }
  const product = await Product.update(
    {
      nombre, 
      precio, 
      stock, 
      proveedor_id, 
      categoria_id
    },
    { where: { producto_id: id } },
  );

  if (!product) {
    return 'No se pudo actualizar';
  }

  const updateProduct = await Product.findOne({ where: { producto_id: id } });

  if (!updateProduct) {
    return 'No se pudo actualizar';
  }

  return updateProduct;
};

const deleteByIdProduct = async (id: number): Promise<string> => {
  const findProduct = await Product.findOne({ where: { producto_id: id } });
  if (!findProduct) {
    return 'No se encuentra Id';
  }
  const removeProduct = await Product.destroy({ where: { producto_id: id } });
  if (!removeProduct) {
    return 'No se pudo eliminar';
  }
  return 'Eliminado';
};

export { findAllProducts, insertProduct, getByIdProduct, updateByIdProduct, deleteByIdProduct };
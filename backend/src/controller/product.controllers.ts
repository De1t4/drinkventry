import { Request, Response } from 'express';
import { deleteByIdProduct, findAllProducts, getByIdProduct, insertProduct, updateByIdProduct } from '../services/products.services';


const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
};

const postProduct = async (req: Request, res: Response) => {
  try {
    const bodyProduct = req.body;
    const product = await insertProduct(bodyProduct);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getByIdProduct(parseInt(id));
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, proveedor_id, categoria_id } = req.body;
    const product = await updateByIdProduct(parseInt(id), { nombre, precio, stock, proveedor_id, categoria_id });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
};

const deleteproduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await deleteByIdProduct(parseInt(id));
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
};

export { getProducts, postProduct, getProductById, updateProduct, deleteproduct };
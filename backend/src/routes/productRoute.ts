import { Router } from 'express';
import { getProducts, postProduct, getProductById, updateProduct, deleteproduct } from '../controller/product.controllers';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', postProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteproduct)

export default productRouter;

import { Router } from 'express';
import { getCategories, postCategory, getCategoryById, updateCategory, deletecategory } from '../controller/category.controllers';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', postCategory);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deletecategory)

export default categoryRouter;

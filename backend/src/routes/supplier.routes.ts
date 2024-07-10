import { Router } from 'express';
import { getSuppliers, getSupplierById, postSupplier, updateSupplier, deleteSupplier } from '../controller/supplier.controllers';
import validationMiddleware from '../middlewares/validatorMiddeware';
import { supplierSchema, supplierIdSchema } from '../validations/supplier';

const supplierRouter = Router();

supplierRouter.get('/', getSuppliers);
supplierRouter.post('/', validationMiddleware(supplierSchema, false), postSupplier);
supplierRouter.get('/:id', validationMiddleware(supplierIdSchema, true), getSupplierById);
supplierRouter.put(
  '/:id',
  validationMiddleware(supplierIdSchema, true),
  validationMiddleware(supplierSchema, false),
  updateSupplier
);
supplierRouter.delete('/:id', validationMiddleware(supplierIdSchema, true), deleteSupplier);

export { supplierRouter };

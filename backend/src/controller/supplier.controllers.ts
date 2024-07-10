import { Request, Response } from 'express';
import { deleteByIdSupplier, findAllSuppliers, getByIdSupplier, insertSupplier, updateByIdSupplier } from '../services/suppliers.services';
import {supplierSchema, supplierIdSchema } from '../validations/supplier';


const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await findAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
  }
};

const postSupplier = async (req: Request, res: Response) => {
  try {
    const bodySupplier = req.body;
    
    const supplier = await insertSupplier(bodySupplier);
    res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
  }
};

const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const supplier = await getByIdSupplier(parseInt(id));
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
     
    const supplier = await updateByIdSupplier(parseInt(id), { nombre, direccion, telefono });
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const supplier = await deleteByIdSupplier(parseInt(id));
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
  }
};

export { getSuppliers, postSupplier, getSupplierById, updateSupplier, deleteSupplier };

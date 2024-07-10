import { CreateSuppliertDto } from '../dto/createSupplier.dto';
import { UpdateSuppliertDto } from '../dto/updateSupplier.dto';
import Proveedor, { IProvedor } from '../models/proveedor.model';

const findAllSuppliers = async (): Promise<IProvedor[]> => {
  const suppliers = await Proveedor.findAll();
  return suppliers;
};

const insertSupplier = async (bodySupplier: CreateSuppliertDto): Promise<IProvedor> => {
  const { nombre, direccion, telefono } = bodySupplier;

  const supplier = await Proveedor.create({
    nombre,
    direccion,
    telefono,
  });

  return supplier;
};

const getByIdSupplier = async (id: number): Promise<IProvedor | string> => {
  console.log('Tipo:', typeof id);
  console.log(id);
  const supplier = await Proveedor.findOne({ where: { id: id } });
  if (!supplier) {
    return 'Supplier id not found.';
  }
  return supplier;
};

const updateByIdSupplier = async (id: number, bodySupplier: UpdateSuppliertDto): Promise<IProvedor | string> => {
  const { nombre, direccion, telefono } = bodySupplier;

  const findSupplier = await Proveedor.findOne({ where: { id: id } });
  if (!findSupplier) {
    return 'Supplier id not found.';
  }

  const supplier = await Proveedor.update(
    {
      nombre,
      direccion,
      telefono,
    },
    { where: { id: id } },
  );

  if (!supplier) {
    return 'Could not update supplier';
  }

  const updateSupplier = await Proveedor.findOne({ where: { id: id } });

  if (!updateSupplier) {
    return 'Could not update supplier after update';
  }

  return updateSupplier;
};

const deleteByIdSupplier = async (id: number): Promise<string> => {
  const findSupplier = await Proveedor.findOne({ where: { id: id } });
  if (!findSupplier) {
    return 'Supplier not found.';
  }
  const removeSupplier = await Proveedor.destroy({ where: { id: id } });
  if (!removeSupplier) {
    return 'Could not delete supplier';
  }
  return 'successfully removed';
};

export { findAllSuppliers, insertSupplier, getByIdSupplier, updateByIdSupplier, deleteByIdSupplier };

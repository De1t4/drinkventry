import { CreateClienttDto } from '../dto/createClient.dto';
import { UpdateSuppliertDto } from '../dto/updateSupplier.dto';
import { Client, IClient } from '../models/client.model';

const findAllClients = async (): Promise<IClient[]> => {
  const suppliers = await Client.findAll();
  return suppliers;
};

const insertClient = async (bodySupplier: CreateClienttDto): Promise<IClient> => {
  const { name, address, phone } = bodySupplier;
  const supplier = await Client.create({
    name,
    address,
    phone,
  });

  return supplier;
};

const getByIdClient = async (id: number): Promise<IClient | string> => {
  const supplier = await Client.findOne({ where: { id: id } });
  if (!supplier) {
    return 'No se encuentra Id';
  }
  return supplier;
};

const updateByIdClient = async (id: number, bodySupplier: UpdateSuppliertDto): Promise<IClient | string> => {
  const { nombre, direccion, telefono } = bodySupplier;
  const findSupplier = await Client.findOne({ where: { id: id } });
  if (!findSupplier) {
    return 'No se encuentra Id';
  }
  const supplier = await Client.update(
    {
      nombre,
      direccion,
      telefono,
    },
    { where: { id: id } },
  );

  if (!supplier) {
    return 'No se pudo actualizar';
  }

  const updateSupplier = await Client.findOne({ where: { id: id } });

  if (!updateSupplier) {
    return 'No se pudo actualizar';
  }

  return updateSupplier;
};

const deleteByIdClient = async (id: number): Promise<string> => {
  const findSupplier = await Client.findOne({ where: { id: id } });
  if (!findSupplier) {
    return 'No se encuentra Id';
  }
  const removeSupplier = await Client.destroy({ where: { id: id } });
  if (!removeSupplier) {
    return 'No se pudo eliminar';
  }
  return 'Eliminado';
};

export { findAllClients, insertClient, getByIdClient, updateByIdClient, deleteByIdClient };

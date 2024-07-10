import { Request, Response } from 'express';
import { deleteByIdClient, findAllClients, getByIdClient, insertClient, updateByIdClient } from '../services/clients.services';


const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await findAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
  }
};

const postClient = async (req: Request, res: Response) => {
  try {
    const bodySupplier = req.body;
    const client = await insertClient(bodySupplier);
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
  }
};

const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await getByIdClient(parseInt(id));
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
  }
};

const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    const client = await updateByIdClient(parseInt(id), { nombre, direccion, telefono });
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
  }
};

const deleteclient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await deleteByIdClient(parseInt(id));
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
  }
};

export { getClients, postClient, getClientById, updateClient, deleteclient };

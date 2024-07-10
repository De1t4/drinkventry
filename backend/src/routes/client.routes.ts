import { Router } from 'express';
import { deleteclient, getClientById, getClients, postClient, updateClient } from '../controller/client.controllers';

const clientRouter = Router();

clientRouter.get('/', getClients);
clientRouter.post('/', postClient);
clientRouter.get('/:id', getClientById);
clientRouter.put('/:id', updateClient);
clientRouter.delete('/:id', deleteclient)

export { clientRouter };

import { Router } from 'express';
import { deleteMovement, getMovementById, getMovements, postMovement, updateMovement } from '../controller/movement.controllers';


const movementRouter = Router();

movementRouter.get('/', getMovements);
movementRouter.post('/', postMovement);
movementRouter.get('/:id', getMovementById);
movementRouter.put('/:id', updateMovement);
movementRouter.delete('/:id', deleteMovement);

export { movementRouter };

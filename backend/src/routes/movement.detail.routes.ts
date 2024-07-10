import { Router } from 'express';
import { deleteMovementDetail, getMovementDetail, getMovementDetails, postMovementDetail, updateMovementDetail } from '../controller/movement.detail.controller';


const movementDetailRouter = Router();

movementDetailRouter.get('/', getMovementDetails);
movementDetailRouter.post('/', postMovementDetail);
movementDetailRouter.get('/:id', getMovementDetail);
movementDetailRouter.put('/:id', updateMovementDetail);
movementDetailRouter.delete('/:id', deleteMovementDetail);

export { movementDetailRouter };
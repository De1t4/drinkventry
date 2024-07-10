import { Request, Response } from "express";
import { deleteByIdMovement, findAllMovements, getByIdMovement, insertMovement, updateByIdMovement } from "../services/movements.services";


const getMovements = async (req: Request, res: Response) => {
  try {
    const movements = await findAllMovements()
    res.status(200).json(movements)
  } catch (error) {
    console.error(error);
  }
}

const postMovement = async (req: Request, res: Response) => {
  try {
    const bodyMovement = req.body;
    const movement = await insertMovement(bodyMovement)
    const { ClientId } = req.body
    if (ClientId && ClientId !== 0) await movement.setClient(parseInt(ClientId))
    res.status(200).json(movement)
  } catch (error) {
    console.error(error)
  }
}

const getMovementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movement = await getByIdMovement(parseInt(id))
    res.status(200).json(movement)
  } catch (error) {
    console.error(error);
  }
}

const updateMovement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { movementDate, movementType, retirementDate } = req.body;
    const movement = await updateByIdMovement(parseInt(id), { movementDate, movementType, retirementDate })
    res.status(200).json(movement)
  } catch (error) {
    console.error(error);
  }
}

const deleteMovement = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    const movement = await deleteByIdMovement(parseInt(id))
    res.status(200).json(movement)
  } catch (error) {
    console.error(error);
  }

}

export { getMovements, postMovement, getMovementById, updateMovement, deleteMovement }
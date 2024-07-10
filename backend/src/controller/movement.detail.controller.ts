import { Request, Response } from "express";
import { deleteMovementDetailById, findAllMovementDetails, findMovementDetail, insertMovementDetail, updateMovementDetailById } from "../services/movement.detail.services";


const getMovementDetails = async (req: Request, res: Response) => {
  try {
    const movementdetails = await findAllMovementDetails();
    res.status(200).json(movementdetails)
  } catch (error) {
    console.error(error);
  }
}

const postMovementDetail = async (req: Request, res: Response) => {
  try {
    const bodyMovementDetail = req.body;
    const movementDetail = await insertMovementDetail(bodyMovementDetail);
    res.status(201).json(movementDetail);
  } catch (error) {
    console.error(error);
  }
}

const getMovementDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movementDetail = await findMovementDetail(parseInt(id));
    res.status(200).json(movementDetail);
  } catch (error) {
    console.error(error);
  }
}

const updateMovementDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const movementDetail = await updateMovementDetailById(parseInt(id), { amount });
    res.status(200).json(movementDetail);
  } catch (error) {
    console.error(error);
  }
}

const deleteMovementDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movementDetail = await deleteMovementDetailById(parseInt(id));
    res.status(200).json(movementDetail);
  } catch (error) {
    console.error(error);
  }
}

export { getMovementDetails, postMovementDetail, getMovementDetail, updateMovementDetail, deleteMovementDetail }
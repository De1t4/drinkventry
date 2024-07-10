import { where } from "sequelize"
import { CreateMovementDeatilDto } from "../dto/createMovementDeatil.dto"
import { UpdateMovementDeatilDto } from "../dto/updateMovementDeatil.dto"
import { MovementDetail } from "../models/movementDetail.model"


const findAllMovementDetails = async () => {
  const movementsDetails = await MovementDetail.findAll()
  return movementsDetails
}

const insertMovementDetail = async (bodyMovementDetail: CreateMovementDeatilDto) => {
  const { amount } = bodyMovementDetail
  const saveMovementDetail = await MovementDetail.create({
    amount
  })

  return saveMovementDetail
}

const findMovementDetail = async (id: number) => {
  const movementDetail = await MovementDetail.findOne({ where: { id } })
  if (!movementDetail) {
    throw new Error('No se encuentra el detalle de movimiento')
  }
  return movementDetail;
}

const updateMovementDetailById = async (id: number, bodyMovementDetail: UpdateMovementDeatilDto) => {
  const { amount } = bodyMovementDetail
  const findmovementDetail = await MovementDetail.findOne({ where: { id } })
  if (!findmovementDetail) {
    throw new Error('No se encuentra el detalle de movimiento')
  }
  const updatemovementDetail = await MovementDetail.update({ amount }, { where: { id } })
  if (!updatemovementDetail) {
    throw new Error('No se pudo actualizar el detalle de movimiento')
  }
  return updatemovementDetail
}

const deleteMovementDetailById = async (id: number) => {
  const movementDetail = await MovementDetail.findOne({ where: { id } })
  if (!movementDetail) {
    throw new Error('No se encuentra el detalle de movimiento')
  }
  const deleteMovementDetail = await MovementDetail.destroy({ where: { id: id } })
  if (!deleteMovementDetail) {
    throw new Error('No se pudo eliminar el detalle de movimiento')
  }
  return "Eliminado";
}

export { findAllMovementDetails, insertMovementDetail, findMovementDetail, updateMovementDetailById, deleteMovementDetailById }
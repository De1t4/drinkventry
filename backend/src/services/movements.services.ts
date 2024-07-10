import { CreateMovementDto } from "../dto/createMovement.dto";
import { UpdateMovementDto } from "../dto/updateMovement.dto";
import { IMovements, Movement } from "../models/movements.model";

const findAllMovements = async (): Promise<IMovements[]> => {
  const movements = await Movement.findAll();
  return movements;
}

const insertMovement = async (bodyMovement: CreateMovementDto): Promise<IMovements> => {

  const { movementDate, movementType, retirementDate } = bodyMovement;

  const movement = await Movement.create({
    movementDate,
    movementType,
    retirementDate,
  });
  return movement;
}

const getByIdMovement = async (id: number): Promise<IMovements | string> => {
  const movement = await Movement.findOne({ where: { id: id } })
  if (!movement) {
    return 'No se encuentra Id';
  }
  return movement
}


const updateByIdMovement = async (id: number, bodyMovement: UpdateMovementDto): Promise<IMovements | string> => {
  const { movementDate, movementType, retirementDate } = bodyMovement;
  const movement = await Movement.findOne({ where: { id: id } })
  if (!movement) {
    return 'No se encuentra Id';
  }
  const movementToUpdate = await Movement.update(
    {
      movementDate,
      movementType,
      retirementDate
    },
    { where: { id: id } },
  )

  if (!movementToUpdate) {
    return 'No se pudo actualizar'
  }

  const updateMovement = await Movement.findOne({ where: { id: id } })
  if (!updateMovement) {
    return 'Id no encontrado'
  }

  return updateMovement
}

const deleteByIdMovement = async (id: number): Promise<string> => {
  const movement = await Movement.findOne({ where: { id: id } })
  if (!movement) {
    return 'No se encuentra Id';
  }
  const removeMovement = await Movement.destroy({ where: { id: id } });
  if (!removeMovement) {
    return 'No se pudo eliminar';
  }
  return 'Eliminado';
}

export { findAllMovements, insertMovement, getByIdMovement, updateByIdMovement, deleteByIdMovement };
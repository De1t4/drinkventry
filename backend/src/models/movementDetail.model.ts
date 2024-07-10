import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../config/db";
import { MovementDeatilInterface } from "../interfaces/movement.detail.interface";

export interface IMovementDetail extends Model, Omit<MovementDeatilInterface, "id"> { }

const MovementDetail = getSequelize().define<IMovementDetail>(
  'movement_detail',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'MovementDetail',
    timestamps: true,
  }
)

export { MovementDetail }


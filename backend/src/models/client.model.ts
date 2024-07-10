import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../config/db";
import { ClientInterface } from "../interfaces/client.interface";
import { Movement } from "./movements.model";

export interface IClient extends Model, Omit<ClientInterface, "id"> { }

const Client = getSequelize().define<IClient>('Client',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    }
  },
  {
    tableName: 'Client',
    timestamps: false
  }
)

Client.hasMany(Movement)
Movement.belongsTo(Client)

export { Client }
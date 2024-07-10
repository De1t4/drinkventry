import { DataTypes, Model } from 'sequelize';
import { getSequelize } from '../config/db';
import { SuppliersInterfaces } from '../interfaces/suppliers.interfaces';

export interface IProvedor extends Model, Omit<SuppliersInterfaces, 'id'> { }

const Proveedor = getSequelize().define<IProvedor>(
  'Proveedor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: 'Proveedor',
    timestamps: false,
  },
);


export default Proveedor;

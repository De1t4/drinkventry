import { DataTypes, Model } from 'sequelize';
import { getSequelize } from '../config/db';
import { CategoryInterfaces } from '../interfaces/category.interface';

export interface ICategory extends Model, Omit<CategoryInterfaces, 'categoria_id'> { }

const Categoria = getSequelize().define(
  'Categoria',
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'Categoria',
    timestamps: false,
  },
);

export default Categoria;

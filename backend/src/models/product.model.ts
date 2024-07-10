import { DataTypes, Model } from 'sequelize';
import { getSequelize } from '../config/db';
import { ProductInterfaces } from '../interfaces/product.interface';

export interface IProduct extends Model, Omit<ProductInterfaces, 'producto_id'> { }

const Product = getSequelize().define<IProduct>(
  'Producto',
  {
    producto_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Proveedor',
        key: 'id',
      },
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'categoria_id',
      },
    },
  },
  {
    tableName: 'Producto',
    timestamps: false,
  },
);

export default Product;

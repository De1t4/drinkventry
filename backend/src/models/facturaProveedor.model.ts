import { DataTypes } from 'sequelize';
import { getSequelize } from '../config/db';

const FacturaProveedor = getSequelize().define(
  'FacturaProveedor',
  {
    factura_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'proveedor',
        key: 'id',
      },
    },
    fecha_emision: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'factura_proveedor',
    timestamps: false,
  },
);

export default FacturaProveedor;

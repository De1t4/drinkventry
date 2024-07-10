import { DataTypes, Model } from 'sequelize';
import { getSequelize } from '../config/db';


import { RolInterface } from '../interfaces/rol.interface';
export interface IRol extends Model, RolInterface { }


const Rol = getSequelize().define<IRol>(
  'Rols',
  {
    rol_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Otras opciones del modelo
    timestamps: false
  },
);

import { UserInterface } from '../interfaces/user.interface';
export interface IUser extends Model, UserInterface { }


const User = getSequelize().define<IUser>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60] // bcrypt hash length https://www.npmjs.com/package/bcrypt#hash-info
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rols',
        key: 'rol_id',
      },
    }
  },
  {
    // Otras opciones del modelo
    timestamps: false
  },
);

(async () => {
  const sequelize = getSequelize();
  try {
    await sequelize.query(`INSERT INTO "Rols" (rol_id, descripcion) VALUES (1,'admin'), (2,'operario') ON CONFLICT DO NOTHING`);

    await sequelize.query(`INSERT INTO "Users" (id, nombre, contrasena, email, rol_id) VALUES (1,'admin','$2b$10$PPqCVqOPn7LxA/Hr0T2EbeIzAZIE/bRpA166oNV097V0/BBZLxIL2','nocontry.s12.23@gmail.com',1) ON CONFLICT DO NOTHING`);

  } catch (error) {
    console.log(error);
  }
})()


export { Rol, User };

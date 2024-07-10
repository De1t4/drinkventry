import { Sequelize } from 'sequelize';
import 'dotenv/config';

let sequelize: Sequelize;

export const getSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(String(process.env.DB_DATABASE), String(process.env.DB_USER), String(process.env.DB_PASS), {
      host: String(process.env.DB_HOST),
      dialect: 'postgres',
      logging: false,
    });
    sequelize.sync({ alter: true })
  }
  return sequelize;
};

import {DataTypes, Model} from 'sequelize';

import {sequelize} from '../config/connection.js';

export class Role extends Model {
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'department',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
  }
);

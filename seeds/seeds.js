import {sequelize} from '../config/connection.js';
import {Department, Employee, Role} from '../models/index.js';
import departmentSeedData from './deparmentSeedData.json' assert {type: 'json'};

import roleSeedData from './roleSeedData.json' assert {type: 'json'};
import employeeSeedData from './employeeSeedData.json' assert {type: 'json'};

const seedDatabase = async () => {
  await sequelize.sync({force: true});

  const departments = await Department.bulkCreate(departmentSeedData);
  const roles = await Role.bulkCreate(roleSeedData);
  const employees = await Employee.bulkCreate(employeeSeedData);

  process.exit(0);
};
await seedDatabase();

module.exports = seedDatabase();

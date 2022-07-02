import {Role} from './Role.js';
import {Department} from './Department.js';
import {Employee} from './Employee.js';


Employee.hasOne(Employee, {
  foreignKey: 'manager_id',
  onDelete: 'SET NULL'
});


export {Department, Employee, Role};

import inquirer from 'inquirer';
import { getAddEmployeeQuestions } from './questionsHelper.js';
import * as questions from './questionsHelper.js';
import {Department, Employee, Role} from './models/index.js';
import {sequelize} from './config/connection.js';
import cTable from 'console.table';
import {ADD_DEPARTMENT,
        ADD_EMPLOYEE,
        ERROR_MESSAGE,
        VIEW_ALL_EMPLOYEES,
        VIEW_ALL_ROLES,
        VIEW_ALL_DEPARTMENTS,
        ADD_ROLE,
        UPDATE_EMPLOYEE_ROLE,} from './consts.js';
import * as Console from 'console';

function getMainMenu() {
  inquirer.prompt(questions.getMainMenuQuestions())
    .then(handleMainMenuResponse);
}

function handleMainMenuResponse(firstResponse) {
  switch (firstResponse.toDoList) {
    case VIEW_ALL_DEPARTMENTS:
      viewAllDepartments();
      break;
    case ADD_DEPARTMENT:
      addDepartment();
      break;
    case VIEW_ALL_EMPLOYEES:
      viewAllEmployees();
      break;
    case ADD_EMPLOYEE:
      addEmployee();
      break;
    case VIEW_ALL_ROLES:
      viewAllRoles();
      break;
    case ADD_ROLE:
      addRoll();
      break;
    case UPDATE_EMPLOYEE_ROLE:
      updateEmployeeRole();
      break;
  }
}

async function viewAllDepartments() {
  try {
    const rows =await Department.findAll()
    for (let i = 0; i < rows.length; i++) {
      rows[i] = rows[i].dataValues;
    }
    console.table(rows);
  } catch (err) {

    console.log(ERROR_MESSAGE, err);
  }
  getMainMenu();
}

async function addDepartment() {
  try {
    const inquirerResponse = await inquirer.prompt(questions.getAddDepartmentQuestions())
    await Department.create({
      name: inquirerResponse.addDepartment
    });
    Console.log('New Department Added!')
  } catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
  getMainMenu();
}

async function viewAllRoles() {
  try {
    const rows = await Role.findAll();
    for (let i = 0; i < rows.length ; i++) {
      rows[i] = rows[i].dataValues;
    }
    console.table(rows);
  } catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
  getMainMenu();
}

async function addRoll(){
  try {
    const inquireResponse = await inquirer.prompt(await questions.getAddRoleQuestions());
    const newRole = await Role.create(inquireResponse);
    console.log(`New roll added: ${newRole.dataValues.title}`)

  } catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
   getMainMenu()
}

async function viewAllEmployees() {
  try {
    const [employeeData] = await sequelize.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"
    );

    console.table(employeeData);



  } catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
  getMainMenu();
}

async function addEmployee() {
  try {
    const inquirerResponse = await inquirer.prompt(await questions.getAddEmployeeQuestions());
    const newEmployee = await Employee.create(inquirerResponse);
    console.log(`New employee added: ${newEmployee.dataValues.last_name}, ${newEmployee.dataValues.first_name}`);
  } catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
  getMainMenu();
}

async function updateEmployeeRole() {
  try {
    const inquireResponse = await inquirer.prompt(await questions.getUpdateRollQuestions());
    const newRole = await Employee.update({
      role_id: inquireResponse.role_id
    },
    {
      where: { last_name: inquireResponse.last_name }
    }

    );
    console.log('Role Updated!' +
      '');

} catch (err) {
    console.log(ERROR_MESSAGE, err);
  }
   getMainMenu()
}

sequelize.sync({force: false}).then(async () => {
  getMainMenu();
});

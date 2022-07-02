import {
  ADD_DEPARTMENT,
  ADD_EMPLOYEE,
  ADD_ROLE,
  ERROR_MESSAGE,
  VIEW_ALL_DEPARTMENTS,
  VIEW_ALL_EMPLOYEES,
  VIEW_ALL_ROLES,
  UPDATE_EMPLOYEE_ROLE
} from './consts.js';

import {Department, Role, Employee} from './models/index.js';

export function getMainMenuQuestions() {
  let choices = [
    VIEW_ALL_EMPLOYEES, // TODO: do
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE_ROLE, // TODO: do
    VIEW_ALL_ROLES,
    ADD_ROLE, // TODO: do
    VIEW_ALL_DEPARTMENTS,
    ADD_DEPARTMENT
  ];

  const questions = [
    {
      type: 'list',
      name: 'toDoList',
      message: 'What would you like to do?',
      choices: choices
    },
  ];
  return questions;
}

export function getAddDepartmentQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'addDepartment',
      message: 'what is the name of the department'

    }
  ];
  return questions;
}

export async function getAddEmployeeQuestions() {
  let roleChoices = [];
  const roles = await Role.findAll();
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i].dataValues;
    roleChoices.push({
      name: role.title,
      value: role.id
    });
  }
  let managerChoices = [];
  const managers = await Employee.findAll();
  for (let i = 0; i < managers.length; i++) {
    const manager = managers[i].dataValues;
    managerChoices.push({
      name:`${manager.last_name}, ${manager.first_name}`,
      value: manager.id
    });
  };

  const questions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'s last name?'

    },
    {
      type: 'list',
      name: 'role_id',
      message: 'what is the employee\'s role?',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'what is the employee\'s manager?',
      choices: managerChoices,
    },

  ];
  return questions;
}

export async function getAddRoleQuestions() {
  let departmentChoices = [];
  const departments = await Department.findAll();
  for (let i = 0; i < departments.length; i++) {
    const department = departments[i].dataValues;
    departmentChoices.push({
      name: department.name,
      value: department.id
    });
  };


  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'What department does role belong to?',
      choices: departmentChoices,
    },
  ];
  return questions;
};

export async function getUpdateRollQuestions() {
  let employeeChoices = [];
  const employees = await Employee.findAll();
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i].dataValues;
    employeeChoices.push({
          'name': employee.last_name,
         'employee_id': employee.id ,
          'role_id': employee.role_id


    });
  };

  let roleChoices = [];
  const roles = await Role.findAll();
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i].dataValues;
    roleChoices.push({
      name: role.title,
      value: role.id
    });

  };

  const questions = [
    {
      type: 'list',
      name: 'last_name',
      message: 'What is the last name role do you want to update?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Which role do you want to assign to the selected employee?',
      choices: roleChoices,
    }
  ]
  return questions;
};


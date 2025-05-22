const { createEmployee } = require('./queries/employees');
const client = require('./client');

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1990-05-15", salary: 70000 },
    { name: "Bob Smith", birthday: "1985-03-12", salary: 80000 },
    { name: "Charlie Brown", birthday: "1992-09-10", salary: 60000 },
    { name: "Daisy Chen", birthday: "1991-06-20", salary: 75000 },
    { name: "Ethan Lee", birthday: "1988-12-01", salary: 82000 },
    { name: "Fiona Green", birthday: "1993-04-22", salary: 68000 },
    { name: "George King", birthday: "1987-08-30", salary: 91000 },
    { name: "Hannah Park", birthday: "1990-11-14", salary: 73000 },
    { name: "Ian Wright", birthday: "1994-02-07", salary: 69000 },
    { name: "Julia Kim", birthday: "1989-07-25", salary: 77000 }
  ];

  await Promise.all(employees.map(createEmployee));
}

module.exports = seedEmployees;

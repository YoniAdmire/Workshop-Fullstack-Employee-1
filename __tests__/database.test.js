import client from "../db/client.js";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

beforeEach(async () => {
  await client.query("DELETE FROM employees;");
});

describe("Employee Queries", () => {
  test("createEmployee creates an employee", async () => {
    const employee = await createEmployee({
      name: "Test User",
      birthday: "1990-01-01",
      salary: 50000,
    });

    expect(employee).toHaveProperty("id");
    expect(employee.name).toBe("Test User");
  });

  test("getEmployees returns all employees", async () => {
    await createEmployee({ name: "A", birthday: "1980-01-01", salary: 60000 });
    await createEmployee({ name: "B", birthday: "1985-01-01", salary: 70000 });

    const employees = await getEmployees();
    expect(employees.length).toBe(2);
  });

  test("getEmployee returns correct employee by ID", async () => {
    const employee = await createEmployee({
      name: "Test",
      birthday: "1995-01-01",
      salary: 45000,
    });

    const found = await getEmployee(employee.id);
    expect(found.name).toBe("Test");
  });

  test("updateEmployee updates and returns the employee", async () => {
    const employee = await createEmployee({
      name: "Old",
      birthday: "1990-01-01",
      salary: 40000,
    });

    const updated = await updateEmployee({
      id: employee.id,
      name: "Updated",
      birthday: "1991-01-01",
      salary: 55000,
    });

    expect(updated.name).toBe("Updated");
    expect(updated.salary).toBe(55000);
  });

  test("deleteEmployee deletes and returns the employee", async () => {
    const employee = await createEmployee({
      name: "Delete Me",
      birthday: "1980-01-01",
      salary: 30000,
    });

    const deleted = await deleteEmployee(employee.id);
    const check = await getEmployee(employee.id);

    expect(deleted.name).toBe("Delete Me");
    expect(check).toBeUndefined();
  });
});

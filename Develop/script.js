// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
 
  // Create employee object
  const employee = {
    firstName: "",
    lastName: "",
    salary: 0
  }

  // Create an empty array to add employees' data
  const employeesArray = [];

  // Keep adding employee while userInput still true
  let keepAdding = true;
  let userInput = true;


  // Repeat until user done adding employees
  while (userInput && keepAdding) {
    // Prompt user for employee's first name
    userInput = window.prompt("Enter employee's first name:");
    if (userInput === null) {
      return;
    } else {
      employee.firstName = userInput;
    }

    // Prompt user for employee's last name
    userInput = window.prompt("Enter employee's last name:");
    if (userInput === null) {
      return
    } else {
      employee.lastName = userInput;
    }

    // Prompt user for employee's salary
    userInput = window.prompt("Enter employee's salary:");
    if (userInput === null) {
      return
    } else {
      employee.salary = userInput;
    }

    

    // Add new employee to employees' array
    employeesArray.push(employee);

    // Console logs newly added employee
    //console.log(employeesArray[employeesArray.length - 1]);

    //console.log(employeesArray);

    keepAdding = window.confirm("Add another employee?");

    if (keepAdding === null) {
      return;
    }

    

  }

  console.log(employeesArray);

  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  
  let totalSalary = 0;

  for (i = 0; i < employeesArray.length; i++) {
    totalSalary =+ employeesArray[i].salary;
  }

  return totalSalary / employeesArray.length;
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
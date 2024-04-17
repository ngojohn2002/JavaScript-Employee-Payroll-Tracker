// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Create an empty array to add employee data
const employeesArray = [];

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
 
  // Set userInput and keepAdding to true to continue adding new employee
  let userInput = true;
  let keepAdding = true;

  // Loop until user done adding employee(s)
  while (userInput && keepAdding) {

    // Create a new employee object
    const employee = {
      firstName: "",
      lastName: "",
      salary: 0
    }

    //-- 1. Prompt user for employee's first name --
    userInput = window.prompt("Please enter employee's first name:");

    //----- 1.1 Validate userInput ------
    //--------- 1.1.1 Re-prompt when userInput is empty
    while (userInput === "") { 
      userInput = window.prompt("Nothing entered. Please enter employee's first name:");
    }
    //-------- 1.1.2 Exit if user clicks Cancel
    if (userInput === null) { 
      return employeesArray;
    } 

    //---- 1.2 Set employee's first name ------
    //-------- 1.2.1 Capitalize first letter
    let capitalizedFirstLetter = userInput.charAt(0).toUpperCase(); 
    //-------- 1.2.2 Slice the remaining letters after the first letter
    let remainingLetters = userInput.slice(1); 
    //-------- 1.2.3 Set employee's first name
    employee.firstName = capitalizedFirstLetter + remainingLetters;

    //-- 2. Prompt user for employee's last name --
    userInput = window.prompt("Please enter employee's last name:");
    
    //----- 2.1 Validate userInput ------
    //--------- 2.1.1 Re-prompt when userInput is empty
    while (userInput === "") { 
      userInput = window.prompt("Nothing entered. Enter employee's last name:");
    }
    //-------- 2.1.2 Exit if user clicks Cancel
    if (userInput === null) { 
      return employeesArray;
    }
    
    //---- 2.2 Set employee's last name ------
    //-------- 2.2.1 Capitalize first letter
    capitalizedFirstLetter = userInput.charAt(0).toUpperCase(); 
    //-------- 2.2.2 Slice the remaining letters after first
    remainingLetters = userInput.slice(1); 
    //-------- 2.2.3 Set employee's first name
    employee.lastName = capitalizedFirstLetter + remainingLetters;

    //-- 3. Prompt user for employee's salary --
    userInput = window.prompt("Enter employee's salary:");
    
    /*
    // If user's input is not a number (isNaN), alert user and set employee's salary to 0
    if (isNaN(userInput)) { 
      window.alert(`Not a number (NaN) was entered. Salary for ${employee.firstName} ${employee.lastName} will default to 0.`);
      userInput = 0;
    } 
    */

    /*------- Note to Self --------
    Can also prompt user to re-enter employee's salary while user's input for employee's salary is not a number (isNaN), as follow:
    ------ End of Note to Self -------*/

    //----- 3.1 Validate userInput ------
    while (isNaN(userInput) || userInput === "") {
      if (isNaN(userInput)) {
        userInput = window.prompt("Not a number (NaN) was entered. Please enter employee's salary:");
      } else {
        // Re-prompt for input if user clicks OK from window.prompt() with empty input
        userInput = window.prompt("Nothing entered. Enter employee's salary:");
      }
    }
    // Exit if user clicks Cancel, causing userInput = null
    if (userInput === null) { 
      return employeesArray;
    } 

    //---- 3.2 Set employee's salary ------
    // Parse employee's salary to float, then apply USD-currency format to properly display formatted employee's salary to browser
    employee.salary = (parseFloat(userInput)).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    
    // Add new employee to the end of employeesArray
    employeesArray.push(employee);

    // Display newly updated employeesArray
    displayEmployees(employeesArray);
    
    // Confirm if user is done adding employee
    keepAdding = window.confirm("Add another employee?");
    if (keepAdding === null) {
      return employeesArray;
    }
  }

  // Return employeesArray to caller function
  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  
  // Check if employeesArray is not empty
  if (employeesArray.length > 0) {
    // Set totalSalary to 0
    let totalSalary = 0;

    // Tally totalSalary of all employees in employeesArray
    for (i = 0; i < employeesArray.length; i++) {
      // Strip employee's salary of any format before perform calculation
      totalSalary += Number((employeesArray[i].salary).replace(/[^0-9.-]+/g,""));
    }

    // Re-apply USD currency format to the calculated average salary for properly formatted display to console
    let formattedAverageSalary = (totalSalary / employeesArray.length).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    
    console.log(`The average employee salary between our ${employeesArray.length} employee(s) is ${formattedAverageSalary}`);
  } else {
    console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $0.00.`);
  }
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee

  // Check if employeesArray is not empty
  if (employeesArray.length > 0) {
    // Generate a random index to select a random employee from the employeesArray
    let randomIndex = Math.floor(Math.random() * employeesArray.length);

    console.log(`Congratulations to ${employeesArray[randomIndex].firstName} ${employeesArray[randomIndex].lastName}, our random drawing winner!`);
  } else {
    console.log(`No employees has been added. Please add employee(s).`);
  }
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

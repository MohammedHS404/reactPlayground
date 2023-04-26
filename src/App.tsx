import { useEffect, useState } from "react";
import { randomNames } from "./randomNames";

export function App() {
  const [employees, setEmployees] = useState<{ email: string, name: string }[]>([]);

  const [employeeForms, setEmployeeForms] = useState<JSX.Element[]>([]);

  const names = randomNames
  
  // mock employees
  useEffect(() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      const name = names[i % names.length];
      array.push({ email: `${name}@gmail.com`, name: name });
    }
    setEmployees(array);
  }, []);

  useEffect(() => {
    setEmployeeForms(
      employees.map((e) => (
        <div>
          <EmployeeForm key={e.email} employee={e} modifiedEmployee={{ isModified: false, email: '', name: '' }} />
        </div>
      ))
    );
  }, [employees]);

  function getModifiedEmployees() {
    const modifiedEmployees = employeeForms.filter(e => e.props.children.props.modifiedEmployee.isModified).map((e) => e.props.children.props.modifiedEmployee);
    console.log(modifiedEmployees);
  }

  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button type="button" onClick={getModifiedEmployees}>
        Save
      </button>
      {employeeForms}
    </div>
  );
}

function EmployeeForm({ employee, modifiedEmployee }: { employee: { email: string, name: string }, modifiedEmployee: { isModified: boolean, email: string, name: string } }) {
  const initialEmail = employee.email;
  const initialName = employee.name;

  const [email, setEmail] = useState(employee.email);
  const [name, setName] = useState(employee.name);

  useEffect(() => {
    updateModifiedEmployee();
  }, [name, email]);


  useEffect(() => {
    updateModifiedEmployee();
  }, [])

  return (
    <>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <input value={name} onChange={(event) => setName(event.target.value)} />
    </>
  );

  function updateModifiedEmployee() {

    modifiedEmployee.email = email;
    modifiedEmployee.name = name;

    if (initialEmail !== email || initialName !== name) {
      modifiedEmployee.isModified = true;
    } else {
      modifiedEmployee.isModified = false;
    }
  }
}
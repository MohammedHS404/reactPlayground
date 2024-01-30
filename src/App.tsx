import { useEffect, useState } from "react";
import { Employee, employees } from "./data";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
export function App() {
  const [data,setData] = useState<Employee[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    setData(employees.slice(0,100));
  }, data);

  useEffect(() => {
    setFilteredData(data);
  }, data);

  useEffect(() => {
    if (!query) {
      setFilteredData(data);
      return;
    }

    setFilteredData(() =>
      data.filter((emp) => emp.userName.toLocaleLowerCase().indexOf(query) > -1)
    );
  }, [query]);

  const employeeElements = filteredData.map((emp) => (
    <EmployeeRow key={emp.accountId} email={emp.userName}></EmployeeRow>
  ));

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </div>
      <div>{employeeElements}</div>
    </div>
  );
}

function EmployeeRow({ email }: { email: string }): JSX.Element {
  console.log("rendering employee row");
  return (
    <div>
      <div>{email}</div>
      <Autocomplete
        options={[1, 2, 3, 4, 5, 6, 7]}
        getOptionLabel={(option: number) => option.toString()}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Employee" />}
      />
    </div>
  );
}

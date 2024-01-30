import { useEffect, useState } from "react";
import { Employee, employees } from "./data";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
export function App() {
  const [data, setData] = useState<Employee[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    console.log("employees init");
    const filteredData = employees.filter(
      (u) => u.userName !== "Former user" && u.userName !== "former.user"
    );
    setData(filteredData);
    setFilteredData(filteredData);
  }, []);

  useEffect(() => {
    console.log("employees query");
    if (!query) {
      setFilteredData(data);
      return;
    }

    setFilteredData(() =>
      data.filter((emp) => emp.userName.toLocaleLowerCase().indexOf(query) > -1)
    );
  }, [query]);

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <EmployeeRow email={filteredData[index].userName}></EmployeeRow>
    </div>
  );

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              className="List"
              itemCount={filteredData.length}
              itemSize={100}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

function EmployeeRow({ email }: { email: string }): JSX.Element {
  return (
    <div 
    style={
      {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }
    }>
      <div>{email}</div>
      <div>
        <Autocomplete
          options={[1, 2, 3, 4, 5, 6, 7]}
          getOptionLabel={(option: number) => option.toString()}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Employee" />}
        />
      </div>
    </div>
  );
}

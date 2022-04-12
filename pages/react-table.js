/* eslint-disable react/jsx-key */
import { useTable, useFilters, useSortBy } from "react-table";
import React, { useState, useEffect, Fragment } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Input,
  Button,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

export default function App() {
  const [filterInputTest, setFilterInputTest] = useState("");
  const [filterInputId, setFilterInputId] = useState("");

  const handleKeyPress = (e, x) => {
    if (e.key === "Enter") {
      // console.log("You pressed a key.");
      // console.log("rowAddStocks", e.target.value);
      // console.log("x", x);
      e.target.value = "";
    }
  };

  //const customAccessor = (originalRow, rowIndex) => {
  // console.log("v",originalRow)
  //console.log("ts",rowIndex)
  // const itemValue = data[rowIndex].col4 + data[rowIndex].col3
  //console.log("itemValue",itemValue);
  // return itemValue
  //}

  const handleChange = (e, row) => {
    const { value } = e.target;

    //still to work on:const itemToChange = data.find((item)=>item.testName ==)
    /*
  console.log("row index",row.original.col1)

 console.log( "itemv",value )
  console.log( "itemxx", row.original )
  console.log( "itemxx", value )
  console.log( "col4", row.original.col4)
 //value = data[]
 


  
 console.log( "itemcol4",row.original.col4 )
 
*/
    //customAccessor(value, rowIndex)
  };

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("col2", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInputTest(value);
  };

  const handleFilterChangeById = (e) => {
    const value = e.target.value || undefined;
    setFilter("col1", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value

    setFilterInputId(value);
  };

  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    fetch(`${process.env.APP_URL}/api/getAllTestsHandler`)
      .then((response) => response.json())
      .then((data) => {
        //data from firebase will be returned as an object and nested ones
        const transformedSales = []; // to transform an object into an array
        for (const key in data) {
          transformedSales.push({
            col1: data[key].id,
            col2: data[key].testName,
            col3: data[key].TotalStocks,
          });
        }
        setData(transformedSales);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Lab Test ID",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Test Name",
        accessor: "col2",
      },
      {
        Header: "TotalStocks",
        accessor: "col3",
      },
      /*
      {
        Header: "Add Stocks",
        accessor: "col3",
      

        // Cell method will provide the cell value; we pass it to render a custom component
        Cell: ({ cell: { row,value } }) =>  <Fragment><Input
        type="number"
        onChange={(value) => handleChange(value, row)}
        onKeyPress={(e) => handleKeyPress(e,row.original.col2)}
      />
        {value}
      </Fragment> 
      },
      */
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter, // The useFilter Hook provides a way to set the filter
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Input
          value={filterInputTest}
          onChange={handleFilterChange}
          placeholder={"Search testname"}
        />
        <Input
          value={filterInputId}
          onChange={handleFilterChangeById}
          placeholder={"Search id"}
        />
      </div>
      <Table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Fragment>
  );
}

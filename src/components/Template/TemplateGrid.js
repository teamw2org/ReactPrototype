import React, { useEffect, useRef, useCallback, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DragAndDrop from "../utils/DragAndDrop";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import "./style.css";

export default function TemplateGrid(props) {
  function createData(template) {
    return { template };
  }

  const rows = [
    createData("retail_ProductText"),
    createData("retail_Image+Price"),
    createData("retail_Detail Image"),
    createData("tsg_Angebot"),
    createData("grid_template"),
    createData("Header Briefing"),
    createData("retail_ProductText_2020"),
    createData("retail_Image+Price_2020"),
    createData("retail_Detail Image_2020"),
    createData("tsg_Angebot_2020"),
    createData("grid_template_2020"),
    createData("Header Briefing_2020"),
  ];

  const [rowsState, setRowState] = new useState(rows);

  const filter = (value) => {
    if (value) {
      const newRowState = rows.filter((a) =>
        a.template.toLowerCase().includes(value.toLowerCase())
      );
      setRowState(newRowState);
    } else {
      setRowState([...rows]);
    }
  };

  const StyledTableCell = withStyles({
    root: {
      padding: "5px",
    },
  })(TableCell);

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  padding: "5px",
                  backgroundColor: "#00B0BC",
                }}
              >
                <SearchIcon
                  style={{
                    marginTop: "19px",
                    marginRight: "5px",
                    fill: "white",
                  }}
                />
                <TextField
                  id="standard-basic"
                  onChange={(e) => filter(e.target.value)}
                  label="Template"
                  InputProps={{
                    disableUnderline: true,
                    spellCheck: false,
                    className: "inputWhiteColor",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <DragAndDrop>
            <TableBody>
              {rowsState.map((row) => (
                <TableRow key={row.template}>
                  <TableCell component="th" scope="row">
                    {row.template}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DragAndDrop>
        </Table>
      </TableContainer>
    </>
  );
}

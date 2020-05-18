import React, {useEffect} from "react";
import TableCell from "@material-ui/core/TableCell";

export default function TreeCell(props){
    const { column } = props;
    const cellAllign = column.align?column.align:"left";

    return (
        <React.Fragment>
            <TableCell align={cellAllign}>{column.label}</TableCell>
        </React.Fragment>
    );
}
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

const headCells = [
    {
        id: "item_name",
        numeric: false,
        disablePadding: true,
        label: "Item Name",
    },
    {
        id: "item_code",
        numeric: true,
        disablePadding: false,
        label: "Item Code",
    },
    {
        id: "category",
        numeric: true,
        disablePadding: false,
        label: "Category",
    },
    {
        id: "opening_stock",
        numeric: true,
        disablePadding: false,
        label: "Stock Quantity",
    },
    {
        id: "stock_on_hold",
        numeric: true,
        disablePadding: false,
        label: "Stock on Hold",
    },
    {
        id: "stock_value",
        numeric: true,
        disablePadding: false,
        label: "Stock Value",
    },
    {
        id: "purchase_price",
        numeric: true,
        disablePadding: false,
        label: "Purchase Price",
    },
    {
        id: "edit",
        numeric: true,
        disablePadding: false,
        label: "",
    },
    {
        id: "adjuststock",
        numeric: true,
        disablePadding: false,
        label: "",
    },
];

const TableHeader = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead style={{ background: "#3e55b9" }}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={ numSelected > 0 && numSelected < rowCount }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                        className="cstchk"
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default TableHeader;
TableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
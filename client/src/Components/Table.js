import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import { Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import AddNewInventoryModel from "./Models/AddNewInventoryModel";
import AdjustStockModel from "./Models/AdjustStockModel";

import { deleteItems, fetchBooks } from "../Redux/Actions/BookInventory";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const TableData = () => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [rowsToShow, setRowsToShow] = useState([]);
    const [toggle, setToggle] = useState(false);

    const {fetch, loading} = useSelector((state) => state.bookInventory);
    
    const dispatch = useDispatch();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    var visibleRows = useMemo(() => 
        stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    , [order, orderBy, page, rowsPerPage, rows]);

    useEffect(() => {
        setRowsToShow(visibleRows);
    }, [visibleRows, fetchAgain, fetch]);

    // delete
    const handleDelete = async () => {
        await dispatch(deleteItems(selected));
        const alldata = await dispatch(fetchBooks());
        setRows(alldata);
        setSelected([]);
    }

    const handleLowCostClick = () => {
        if(!toggle) {
            visibleRows = rows.filter((row) => row.opening_stock < row.low_cost_unit);
        } else {
            visibleRows = rows.filter((row) => row).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        }
        setToggle(!toggle);
        setRowsToShow(visibleRows);
    }

    const handleCategoryClick = (cat) => {
        setToggle(false)
        if(cat!=="all") {
            visibleRows = rows.filter((row) => row.category.toLowerCase() === cat);
        } else {
            visibleRows = rows.filter((row) => row).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        }
        setRowsToShow(visibleRows);
    }

    useEffect(() => {
        const fetchData = async () => {
            const alldata = await dispatch(fetchBooks());
            // console.log(alldata);
            setRows(alldata);
        }
        fetchData();
    }, [fetchAgain, fetch, dispatch]);

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableToolbar 
                    numSelected={selected.length} 
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    handleDelete={handleDelete}
                    handleLowCostClick={handleLowCostClick}
                    handleCategoryClick={handleCategoryClick}
                    toggle={toggle}
                />
                {
                    loading ? (
                        <Box sx={{
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center", 
                                padding: "50px 20px", 
                                fontSize: 24, 
                                fontWeight: 800, 
                                color: "#3e55b9"
                            }}
                        >
                            Loading Data...
                        </Box>
                    ) : (
                        
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={"medium"}
                            >
                                {(rows && rows.length > 0) ? (
                                <>
                                    <TableHeader
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows?.length}
                                    />
                                    <TableBody>
                                        {rowsToShow?.map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: "pointer", height: 53 }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{ "aria-labelledby": labelId }}
                                                            onClick={(event) => handleClick(event, row._id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.item_name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.item_code}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.category}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.opening_stock} {row.stock_unit.toUpperCase()}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.stock_on_hold} {row.stock_unit.toUpperCase()}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        ₹ {row.stock_value}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        ₹ {row.purchase_price}
                                                    </TableCell>
                                                    <TableCell align="right" sx={{display: "flex", justifyContent: "space-between"}}>
                                                        <AddNewInventoryModel
                                                            setFetchAgain={setFetchAgain}
                                                            fetchAgain={fetchAgain}
                                                            formdata={row}
                                                            edit={true}
                                                            setRows={setRows}
                                                        >
                                                            <IconButton
                                                                aria-label="edit"
                                                                size="small"
                                                                sx={{ color: "#3e55b9" }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </AddNewInventoryModel>
                                                        {row.opening_stock < row.low_cost_unit && (
                                                                <IconButton
                                                                    aria-label=""
                                                                    size="small"
                                                                    sx={{
                                                                        color: "#f00",
                                                                    }}
                                                                    >
                                                                    <WarningIcon fontSize="small" />
                                                                </IconButton>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <AdjustStockModel
                                                            setFetchAgain={setFetchAgain}
                                                            fetchAgain={fetchAgain}
                                                            formdata={row}
                                                            edit={true}
                                                            setRows={setRows}
                                                        >
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{ 
                                                                    fontSize: 12, 
                                                                    borderWidth: 2,
                                                                    "&:hover": {
                                                                        borderWidth: 2,
                                                                    } 
                                                                }}
                                                            >
                                                                Adjust Stock
                                                            </Button>
                                                        </AdjustStockModel>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: 53 * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </>
                                ) : (
                                    <Box sx={{
                                            display: "flex", 
                                            justifyContent: "center", 
                                            alignItems: "center", 
                                            padding: "50px 20px", 
                                            fontSize: 24, 
                                            fontWeight: 800, 
                                            color: "#3e55b9"
                                        }}
                                    >
                                        No data found
                                    </Box>
                                )}
                            </Table>
                        </TableContainer>
                    )
                }
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default TableData;

import * as React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddNewInventoryModel from "./Models/AddNewInventoryModel";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";

const TableToolbar = (props) => {
    const {loading} = useSelector((state) => state.bookInventory);
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%", fontWeight: 900, color: "#3e55b9" }}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                >
                    Book Inventory
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <LoadingButton
                        variant="outlined"
                        color="error"
                        onClick={() => props.handleDelete()}
                        style={{ fontWeight: 600 }}
                        sx={{
                            letterSpacing: 1.5,
                            borderWidth: 3,
                            "&:hover": {
                                borderWidth: 3,
                            }
                        }}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </LoadingButton>
                    
                </Tooltip>
            ) : (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Button
                        variant={props.toggle ? "contained" : "text"}
                        sx={{ width: 190, height: 40 }}
                        onClick={() => props.handleLowCostClick()}
                    >
                        Show Low Stock 
                        <Typography ml={2} color={"#f00"} fontWeight={800}>
                            {!props.toggle ? <>&nbsp;</> : <>x</>}
                        </Typography>
                    </Button>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel
                            id="demo-select-small"
                            sx={{
                                borderColor: "#3e55b9",
                                color: "#3e55b9",
                                fontSize: 13,
                            }}
                        >
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Category"
                            onChange={(e) => props.handleCategoryClick(e.target.value)}
                            sx={{ color: "#3e55b9" }}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"inverter"}>Inverter</MenuItem>
                            <MenuItem value={"panel"}>Panel</MenuItem>
                            <MenuItem value={"wire"}>Wire</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    <AddNewInventoryModel
                        setFetchAgain={props.setFetchAgain}
                        fetchAgain={props.fetchAgain}
                    >
                        <Tooltip title="Add" arrow>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ width: 200 }}
                            >
                                Add To Inventory
                            </Button>
                        </Tooltip>
                    </AddNewInventoryModel>
                </Box>
            )}
        </Toolbar>
    );
};

export default TableToolbar;

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

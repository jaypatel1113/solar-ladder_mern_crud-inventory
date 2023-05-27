import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import LoadingButton from "@mui/lab/LoadingButton";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { addBook, editBook } from "../../Redux/Actions/BookInventory";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    outline: "none",
    p: 4,
    display: "flex",
    gap: 4,
    maxHeight: "80vh",
    overflow: "auto",
    flexDirection: "column",
    padding: 5,
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar": {
        width: "5px",
        backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#3e55b9",
    },
};

const AddNewInventoryModel = ({ children, fetchAgain, setFetchAgain, formdata={}, edit=false }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(formdata);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const {loading} = useSelector((state) => state.bookInventory);

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "stock_warning") {
            if (data.stock_warning === false) {
                setData({ ...data, stock_warning: true });
            } else {
                setData({ ...data, stock_warning: false });
            }
        } else if (name === "tax") {
            if (data.tax === false) {
                setData({ ...data, tax: true });
            } else {
                setData({ ...data, tax: false });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                // console.log(Reader.result);
                setData({ ...data, picture: Reader.result });
            }
        };
    };

    const handleSubmit = async () => {
        if(edit) {
            await dispatch(editBook(data));
        } else {
            await dispatch(addBook(data));
        }
        handleClose();
        setFetchAgain(!fetchAgain)
        setData({as_of_date: new Date().toISOString().substring(0, 10)})
    };
    
    useEffect(() => {
        setData(formdata);
    }, [fetchAgain]);
    

    useEffect(() => {
        setData(formdata);
        setData({...data, as_of_date: new Date().toISOString().substring(0, 10)})
    }, []);

    return (
        <Box>
            <Box onClick={handleOpen}>{children}</Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        fontWeight={700}
                    >
                        {edit ? "Update Item" : "Create Item"}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box
                            display={"flex"}
                            gap={2}
                            flexDirection={"column"}
                            width={"100%"}
                        >
                            <Typography>General Details</Typography>
                            <TextField
                                color="primary"
                                name="picture"
                                fullWidth
                                // value={data.picture || ""}
                                id="picture"
                                type="file"
                                onChange={handleImage}
                                accept="image/*"
                            />
                            {data.picture ? (
                                    <Avatar
                                        alt="Error"
                                        src={data?.picture.url || data?.picture}
                                        sx={{
                                            width: data.stock_warning ? 150 : 103,
                                            height: data.stock_warning ? 150 : 103,
                                            borderRadius: 0,
                                            mx: "auto",
                                        }}
                                    />
                                ) : (
                                    <Avatar
                                        alt="Error"
                                        src={"https://www.wihcon.com/wp-content/plugins/Builder_UX-development/admin/assets/img/noImageSelected.jpg"}
                                        sx={{
                                            width: data.stock_warning ? 150 : 103,
                                            height: data.stock_warning ? 150 : 103,
                                            borderRadius: 0,
                                            mx: "auto",
                                        }}
                                    />
                                )
                            }
                            <TextField
                                color="primary"
                                name="item_name"
                                value={data.item_name || ""}
                                fullWidth
                                id="item_name"
                                label="Item Name"
                                onChange={handleOnChange}
                            />
                            <FormControl>
                                <InputLabel id="demo-select">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name="category"
                                    label="Category"
                                    onChange={handleOnChange}
                                    value={data.category || ""}
                                >
                                    <MenuItem value={"panel"}>Panel</MenuItem>
                                    <MenuItem value={"inverter"}>Inverter</MenuItem>
                                    <MenuItem value={"wire"}>Wire</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                color="primary"
                                name="item_code"
                                value={data.item_code || ""}
                                fullWidth
                                label="Item code"
                                id="item_code"
                                onChange={handleOnChange}
                            />
                            <TextField
                                color="primary"
                                name="item_desc"
                                value={data.item_desc || ""}
                                fullWidth
                                label="Item Description"
                                id="item_desc"
                                multiline
                                minRows={3}
                                onChange={handleOnChange}
                            />
                        </Box>
                        <Box
                            display={"flex"}
                            gap={2}
                            flexDirection={"column"}
                            width={"100%"}
                        >
                            <Typography>Stock Details</Typography>
                            <FormControl>
                                <InputLabel id="demo-select">Unit</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="stock_unit"
                                    name="stock_unit"
                                    label="unit"
                                    onChange={handleOnChange}
                                    value={data.stock_unit || ""}
                                >
                                    <MenuItem value={"mt"}>Meter(MT)</MenuItem>
                                    <MenuItem value={"cm"}>CentiMeter(CM)</MenuItem>
                                    <MenuItem value={"km"}>KiloMeter(KM)</MenuItem>
                                </Select>
                            </FormControl>
                            <Input
                                color="primary"
                                name="opening_stock"
                                fullWidth
                                value={data.opening_stock || ""}
                                placeholder="Opening Stock"
                                id="opening_stock"
                                onChange={handleOnChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {data?.stock_unit}
                                    </InputAdornment>
                                }
                            />
                            <TextField
                                color="primary"
                                name="as_of_date"
                                defaultValue={new Date().toISOString().substring(0, 10)}
                                type="date"
                                fullWidth
                                focused
                                label="As of Date"
                                value={data.as_of_date || ""}
                                id="as_of_date"
                                onChange={handleOnChange}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="stock_warning"
                                        onChange={handleOnChange}
                                        checked={data.stock_warning || false}
                                    />
                                }
                                label="Enable low stock warning"
                            />
                            {data?.stock_warning && (
                                <Input
                                    color="primary"
                                    name="low_cost_unit"
                                    fullWidth
                                    value={data.low_cost_unit || ""}
                                    label="Low Cost Unit"
                                    id="low_cost_unit"
                                    onChange={handleOnChange}
                                    placeholder="Low Stock Unit"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {data?.stock_unit}
                                        </InputAdornment>
                                    }
                                />
                            )}
                            <Typography mt={3}>Pricing Details</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="tax"
                                        onChange={handleOnChange}
                                        checked={data.tax || false}
                                    />
                                }
                                label="Inclusive of Tax"
                            />
                            <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard"
                            >
                                <InputLabel htmlFor="purchase_price">
                                    Amount
                                </InputLabel>
                                <Input
                                    id="purchase_price"
                                    value={data.purchase_price || ""}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            ₹
                                        </InputAdornment>
                                    }
                                    onChange={handleOnChange}
                                    name="purchase_price"
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel id="demo-select">
                                    GST Tax Rate
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name="gst_rate"
                                    label="Gst Tax Rate"
                                    onChange={handleOnChange}
                                    value={data.gst_rate || ""}
                                >
                                    <MenuItem value={2}>GST @2%</MenuItem>
                                    <MenuItem value={5}>GST @5%</MenuItem>
                                    <MenuItem value={7}>GST @7%</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 3
                    }}>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => setData({as_of_date: new Date().toISOString().substring(0, 10)})}
                            startIcon={<RestartAltIcon />}
                            style={{ fontWeight: 600 }}
                            sx={{ letterSpacing: 1.5 }}
                            disabled={loading}
                        >
                            Reset
                        </Button>

                        <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            style={{ fontWeight: 600 }}
                            sx={{ letterSpacing: 1.5 }}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<DownloadDoneIcon />}
                        >
                            {edit ? "Update" : "Add"}
                        </LoadingButton>
                    
                    </Box>

                    <Box
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: 45,
                            right: "3%",
                            cursor: "pointer",
                        }}
                    >
                        <AiFillCloseCircle
                            style={{ color: "#f25b57", fontSize: "1.6rem" }}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AddNewInventoryModel;

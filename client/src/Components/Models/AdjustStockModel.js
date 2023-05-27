import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import LoadingButton from "@mui/lab/LoadingButton";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { updateStock } from "../../Redux/Actions/BookInventory";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "none",
    outline: "none",
    bgcolor: "background.paper",
    boxShadow: 24,
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

const AdjustStockModel = ({ children, fetchAgain, setFetchAgain, formdata = {} }) => {
    const [open, setOpen] = useState(false);
    const [detail, setDetails] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setDetails({ final_stock: formdata.opening_stock, addorreduce: "add" });
        setOpen(false);
    };

    const { loading } = useSelector((state) => state.bookInventory);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "adjust_stock") {
            if (detail.addorreduce === "add") {
                setDetails({
                    ...detail,
                    adjust_stock: value,
                    final_stock:
                        parseInt(formdata.opening_stock) + parseInt(value) ||
                        parseInt(formdata.opening_stock),
                });
            } else if (detail.addorreduce === "reduce") {
                setDetails({
                    ...detail,
                    adjust_stock: value,
                    final_stock:
                        parseInt(formdata.opening_stock) - parseInt(value) ||
                        parseInt(formdata.opening_stock),
                });
            }
        } else {
            setDetails({ ...detail, [name]: value });
        }
    };

    const handleSubmit = async () => {
        // console.log(detail);
        await dispatch(
            updateStock({
                _id: formdata._id,
                final_stock: detail.final_stock,
                remark: detail.remark,
            })
        );

        handleClose();
        setFetchAgain(!fetchAgain);
        setDetails({ final_stock: detail.final_stock, addorreduce: "add" });
    };

    useEffect(() => {
        setDetails({ final_stock: formdata.opening_stock, addorreduce: "add" });
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
                        Adjust Stock Quantity
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box
                            display={"flex"}
                            gap={2}
                            flexDirection={"column"}
                            width={"100%"}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 900 }}>Item Name</Typography>
                                <Typography>: {formdata.item_name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 900 }}>Current Stock</Typography>
                                <Typography>: {formdata.opening_stock}</Typography>
                            </Box>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="addorreduce"
                                    id="addorreduce"
                                    onChange={handleOnChange}
                                >
                                    <FormControlLabel
                                        value="add"
                                        control={<Radio />}
                                        label="Add (+)"
                                        checked={detail.addorreduce === "add"}
                                    />
                                    <FormControlLabel
                                        value="reduce"
                                        control={<Radio />}
                                        label="Reduce (-)"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                color="primary"
                                name="adjust_stock"
                                value={detail.adjust_stock || ""}
                                fullWidth
                                id="adjust_stock"
                                label="Adjust Stock"
                                onChange={handleOnChange}
                            />
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 900 }}>
                                    Final Stock
                                </Typography>
                                <Typography>: {detail?.final_stock}</Typography>
                            </Box>

                            <TextField
                                color="primary"
                                name="remark"
                                value={detail.remark || ""}
                                fullWidth
                                placeholder="Item Remark(optinal)"
                                id="remark"
                                onChange={handleOnChange}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleClose()}
                            startIcon={<RestartAltIcon />}
                            style={{ fontWeight: 600 }}
                            sx={{ letterSpacing: 1.5 }}
                        >
                            Cancel
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
                            Save
                        </LoadingButton>
                    </Box>

                    <Box
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: 45,
                            right: "7%",
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

export default AdjustStockModel;

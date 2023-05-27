import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import EnhancedTable from "../Components/Table";
import ProfileModal from "../Components/Models/ProfileModal";

import { logoutUser } from "../Redux/Actions/User";

const Inventory = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <Box padding={7}>
            <EnhancedTable />

            <ProfileModal>
                <Box
                    sx={{
                        background: "#3e55b9",
                        padding: "10px 20px",
                        width: 150,
                        textAlign: "center",
                        borderRadius: 3,
                        position: "fixed",
                        bottom: 50,
                        cursor: "pointer",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: 16, fontWeight: 800, color: "#fff" }}
                    >
                        My Profile
                    </Typography>
                </Box>
            </ProfileModal>

            <Box
                onClick={() => handleLogout()}
                sx={{
                    background: "#3e55b9",
                    padding: "10px 20px",
                    width: 150,
                    textAlign: "center",
                    borderRadius: 3,
                    position: "fixed",
                    bottom: 50,
                    right: 56,
                    cursor: "pointer",
                }}
            >
                <Typography
                    sx={{ fontSize: 16, fontWeight: 800, color: "#fff" }}
                >
                    Logout
                </Typography>
            </Box>
        </Box>
    );
};

export default Inventory;

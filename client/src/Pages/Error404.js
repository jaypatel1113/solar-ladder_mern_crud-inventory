import React from "react";
import { Box, Typography } from "@mui/material";

import NotFoundAnimations from "../Components/Animations/NotFoundAnimations";

const Error404 = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 5,
            }}
        >
            <NotFoundAnimations />
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        color: "#3e55b9",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: 3
                    }}
                >
                    Page Not Found
                </Typography>
            </Box>
        </Box>
    );
};

export default Error404;

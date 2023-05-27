import React from "react";
import { Box, Typography } from "@mui/material";

import UnauthorizeAnimation from "../Components/Animations/UnauthorizeAnimation";

const Unauthorized = () => {
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
            <UnauthorizeAnimation />
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
                    Unauthorize access
                </Typography>
            </Box>
        </Box>
    );
};

export default Unauthorized;

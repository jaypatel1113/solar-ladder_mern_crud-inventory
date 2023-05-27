import React from "react";
import { Box } from "@mui/material";

import LoadingAnimation from "../Components/Animations/LoadingAnimation";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                transform: "scale(0.3)"
            }}
        >
            <LoadingAnimation />
        </Box>
    );
};

export default Loading;

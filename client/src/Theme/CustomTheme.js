import { createTheme } from "@mui/material";

const CustomTheme = createTheme({
    palette: {
        primary: {
            main: "#3e55b9",
        },
    },
    typography: {
        fontFamily: `'Poppins', sans-serif`,
    },
});

export default CustomTheme;

import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import Loading from "./Loading";
import Login from "../Components/UserComponents/Login";
import Register from "../Components/UserComponents/Register";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}`,
    };
}

const Home = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const {loading} = useSelector((state) => state.bookInventory);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    if(loading) {
        return <Loading />;
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: "100vw",
            }}
        >
            <Box
                sx={{ bgcolor: "background.paper", width: 500, minHeight: "90vh" }}
            >
                <AppBar position="static" style={{ background: "#3e55b9" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        TabIndicatorProps={{
                            style: {
                                background: "#fff",
                                height: "3px",
                                borderRadius: "3px",
                            },
                        }}
                    >
                        <Tab
                            style={{ fontWeight: 700 }}
                            label="Login"
                            {...a11yProps(0)}
                        />
                        <Tab
                            style={{ fontWeight: 700 }}
                            label="Register"
                            {...a11yProps(1)}
                        />
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Login />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Register />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel> */}
                </SwipeableViews>
            </Box>
        </Box>
    );
};

export default Home;

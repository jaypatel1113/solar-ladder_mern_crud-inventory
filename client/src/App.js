import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Home from "./Pages/Home";
import Inventory from "./Pages/Inventory";
import Error404 from "./Pages/Error404";
import Unauthorized from "./Pages/Unauthorized";
import Loading from "./Pages/Loading";
import AuthRoutes from "./ProtectedRoutes/AuthRoutes";

import { getUser } from "./Redux/Actions/User";
import { fetchBooks } from "./Redux/Actions/BookInventory";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
    const { message, error, isAuthenticated, initalLoading, isLogin } = useSelector((state) => state.user);
    const { message: msg, error: err, fetch } = useSelector((state) => state.bookInventory);

    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            await dispatch(getUser());
        };
        loadData();
    }, [isLogin, dispatch]);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [fetch, dispatch]);

    // display messages and errors from backend in all components
    useEffect(() => {
        if (error) {
            toast.error(error, { toastId: "info" });
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (message) {
            toast.success(message, { toastId: "msg" });
            dispatch({ type: "CLEAR_MESSAGE" });
        }
        if (err) {
            toast.error(err, { toastId: "info" });
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (msg) {
            toast.success(msg, { toastId: "msg" });
            dispatch({ type: "CLEAR_MESSAGE" });
        }
    }, [error, message, err, msg, dispatch]);

    return (
        <>
            {initalLoading ? <Loading /> : (
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/inventory" /> : <Home />}/>
                    {/* <Route path="/inventory" element={<Inventory />} /> */}

                    <Route element={<AuthRoutes isAuthenticated={isAuthenticated} />}>
                        <Route path="/inventory" element={<Inventory />} />
                    </Route>

                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                limit={5}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default App;

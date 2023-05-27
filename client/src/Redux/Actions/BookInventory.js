import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const fetchBooks = () => async (dispatch) => {
    try {
        dispatch({
            type: "FETCH_BOOK_REQUEST",
        });

        const {data} = await client.get("/api/book/fetch");

        dispatch({
            type: "FETCH_BOOK_SUCCESS",
            payload: data.books,
        });
        return data.books;
    } catch (error) {
        dispatch({
            type: "FETCH_BOOK_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const addBook = (bookData) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_BOOK_REQUEST",
        });

        const {data} = await client.post("/api/book/add", {bookData});

        dispatch({
            type: "ADD_BOOK_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ADD_BOOK_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const editBook = (newData) => async (dispatch) => {
    try {
        dispatch({
            type: "EDIT_BOOK_REQUEST",
        });

        const {data} = await client.put("/api/book/edit", {newData});

        dispatch({
            type: "EDIT_BOOK_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "EDIT_BOOK_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const updateStock = (stock) => async (dispatch) => {
    try {
        dispatch({
            type: "UPDATE_STOCK_REQUEST",
        });

        const {data} = await client.patch("/api/book/update-stock", {stock});

        dispatch({
            type: "UPDATE_STOCK_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_STOCK_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const deleteItems = (selectedIds) => async (dispatch) => {
    try {
        dispatch({
            type: "DELETE_ITEM_REQUEST",
        });

        const {data} = await client.put("/api/book/delete", {selectedIds});

        dispatch({
            type: "DELETE_ITEM_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_ITEM_FAILURE",
            payload: error.response.data.message,
        });
    }
}

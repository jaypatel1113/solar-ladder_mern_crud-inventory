import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    books: [], 
    fetch: true,
};

export const bookInventoryReducer = createReducer(initialState, {
    FETCH_BOOK_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_BOOK_SUCCESS: (state, action) => {
        state.loading = false;
        state.books = action.payload;
    },
    FETCH_BOOK_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    ADD_BOOK_REQUEST: (state) => {
        state.loading = true;
    },
    ADD_BOOK_SUCCESS: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.message = action.payload;
    },
    ADD_BOOK_FAILURE: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.error = action.payload;
    },

    EDIT_BOOK_REQUEST: (state) => {
        state.loading = true;
    },
    EDIT_BOOK_SUCCESS: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.message = action.payload;
    },
    EDIT_BOOK_FAILURE: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.error = action.payload;
    },

    UPDATE_STOCK_REQUEST: (state) => {
        state.loading = true;
    },
    UPDATE_STOCK_SUCCESS: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.message = action.payload;
    },
    UPDATE_STOCK_FAILURE: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.error = action.payload;
    },

    DELETE_ITEM_REQUEST: (state) => {
        state.loading = true;
    },
    DELETE_ITEM_SUCCESS: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.message = action.payload;
    },
    DELETE_ITEM_FAILURE: (state, action) => {
        state.loading = false;
        state.fetch = !state.fetch;
        state.error = action.payload;
    },


    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null;
    },
});
import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./Reducers/User";
import { bookInventoryReducer } from "./Reducers/BookInventory";

const Store = configureStore({
    reducer: {
        user: userReducer,
        bookInventory: bookInventoryReducer,
    },
});

export default Store;

import express from "express";
const bookInvRoutes = express.Router();

import { addBook, deleteBook, editBook, fetchBooks, udpateStocks } from "../controllers/bookInvController.js";
import { isAuthenticated } from "../middlewares/auth.js";

bookInvRoutes.route("/fetch").get(isAuthenticated, fetchBooks);
bookInvRoutes.route("/add").post(isAuthenticated, addBook);
bookInvRoutes.route("/delete").put(isAuthenticated, deleteBook);
bookInvRoutes.route("/edit").put(isAuthenticated, editBook);
bookInvRoutes.route("/update-stock").patch(isAuthenticated, udpateStocks);

export { bookInvRoutes };

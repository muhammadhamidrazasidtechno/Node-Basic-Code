// Importing express module
import express from "express";

// Importing sub-routers
import productRouter from './products.mjs';
import adsRouter from './ads.mjs';
import UserRouter from "./users.mjs";

// Creating an instance of Express Router
const Router = express.Router();

// Using sub-routers for different routes
Router.use('/products', productRouter);
Router.use('/ads', adsRouter);
Router.use('/user', UserRouter);

// Exporting the main router
export default Router;

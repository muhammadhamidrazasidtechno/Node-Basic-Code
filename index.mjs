
import express from 'express';
import router from './Router/index.mjs';

// import db from './config/db';
import db from "./config/db.mjs"
const app = express();

console.log("hello");
app.use(express.json());

app.use('/', router);

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

app.listen(3001, () => {
    console.log("Server connected to localhost!");
});

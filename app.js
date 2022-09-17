/**
 * The file that contains the main entry point to the application.
 */
const express = require('express');
const app = express();
const port = 3000;
const routes = require("./routes/index");

app.use(routes);        // use routes to direct application traffic

app.listen(port, () => {
    console.log(`Personal Assignment 1 listening on port http://localhost:3000/`);
})
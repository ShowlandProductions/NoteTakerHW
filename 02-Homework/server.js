//Required Dependencies 
const express = require("express");
const fs = require("fs");
//Express App Information
var app = express();
var PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));
//Required routes
require("./routes/html_routes")(app);
require("./routes/api_routes")(app);
// Listening function
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

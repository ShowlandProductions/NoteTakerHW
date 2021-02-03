//Required Path
const path = require("path");
//Get Function and join path
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/notes.html"));
    });
}
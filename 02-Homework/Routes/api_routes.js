//Require FS
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//Get Functions
module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(data);
    });
    app.get("/api/notes/:id", function(req, res) {
        res.json(data[Number(req.params.id)]);
    });
//Post Functions
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 
        res.json(data);    
    });
//Delete Functions
    app.delete("/api/notes/:id", function(req, res) {
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Delete note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 
}


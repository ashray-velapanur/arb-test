const io = require("socket.io");
const fs = require("fs");
const server = io.listen(8000);

var fileNames = [];

fs.readdir("./data", (err, names) => {
  fileNames = names;
})

server.on("connection", function(socket) {
  console.log("connected");

  socket.emit("fileNames", { fileNames: fileNames });

  socket.on("fetchData", (data) => {
    fs.readFile("data/" + data.fileName, "utf8", function (err, fileData) {
      if (err) throw err;
      var validJson = JSON.parse(fileData.replace(/'/g, '"'));
      socket.emit("fileData", { data: JSON.stringify(validJson) });
    });
  });

});

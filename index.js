require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const determineCoupureGeneric = require("./dab");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté :", socket.id);

  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);

    const match = msg.match(/^dab\/\s*(\d+)$/);
    if (match) {
      const montant = parseInt(match[1], 10);
      const result = determineCoupureGeneric({ montant, typeDevise: "EUR" });
      socket.emit("message", result);
    } else {
      io.emit("message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté :", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

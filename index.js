require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const swaggerSetup = require("./config/swagger");
const determineCoupureGeneric = require("./dab");
const produitRoute = require("./routes/produitRoute");
const utilisateurRoute = require("./routes/utilisateurRoute");

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

app.use("/api", produitRoute);
app.use("/api", utilisateurRoute);

swaggerSetup(app);

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

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const utilisateurRoute = require("./routes/utilisateurRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/users", utilisateurRoute);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

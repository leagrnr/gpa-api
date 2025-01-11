const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Client = sequelize.define(
  "Client",
  {
    idUtilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Utilisateur,
        key: "idUtilisateur",
      },
    },
    reduction: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Client",
    schema: "Utilisateur",
    timestamps: false,
  },
);

module.exports = Client;

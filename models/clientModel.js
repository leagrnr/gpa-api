const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Client = sequelize.define(
  "Client",
  {
    reduction: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
  },
  {
    tableName: "Client",
    schema: "Utilisateur",
    timestamps: false,
  },
);

Client.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });

module.exports = Client;

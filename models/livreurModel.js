const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Livreur = sequelize.define(
  "Livreur",
  {
    zone_livraison: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    vehicule: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    permis: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Livreur",
    schema: "Utilisateur",
    timestamps: false,
  },
);

Livreur.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });

module.exports = Livreur;

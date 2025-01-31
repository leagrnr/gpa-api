const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");
const Produit = require("./produitModel");

const Fournisseur = sequelize.define(
  "Fournisseur",
  {
    nom_societe: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    n_SIRET: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idProduit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Fournisseur",
    schema: "Utilisateur",
    timestamps: false,
  },
);

Fournisseur.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });
Fournisseur.belongsTo(Produit, { foreignKey: "idProduit" });

module.exports = Fournisseur;

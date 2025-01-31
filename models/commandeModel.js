const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Commande = sequelize.define(
  "Commande",
  {
    idCommande: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date_commande: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    montant_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    adresse_livraison: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateur,
        key: "idUtilisateur",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Commande",
    schema: "Commande",
    timestamps: false,
  },
);

Commande.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });

module.exports = Commande;

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Produit = sequelize.define(
  "Produit",
  {
    idProduit: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prix: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Produit",
    schema: "Produit",
    timestamps: false,
  },
);

module.exports = Produit;

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    idUtilisateur: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "Fournisseur",
        "Commercial",
        "Client",
        "Livreur",
        "Administrateur",
      ),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    tableName: "Utilisateur",
    schema: "Utilisateur",
    timestamps: false,
  },
);

module.exports = Utilisateur;

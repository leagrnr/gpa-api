const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Administrateur = sequelize.define(
  "Administrateur",
  {
    niveau_acces: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    departement: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Administrateur",
    schema: "Utilisateur",
    timestamps: false,
  },
);

Administrateur.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });

module.exports = Administrateur;

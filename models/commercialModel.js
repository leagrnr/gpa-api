const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Utilisateur = require("./utilisateurModel");

const Commercial = sequelize.define(
  "Commercial",
  {
    secteur: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nb_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Commercial",
    schema: "Utilisateur",
    timestamps: false,
  },
);

Commercial.belongsTo(Utilisateur, { foreignKey: "idUtilisateur" });

module.exports = Commercial;

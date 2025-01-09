const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
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
      validate: {
        notEmpty: true,
      },
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "utilisateur",
    },
    telephone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        is: /^[0-9\-+]{9,15}$/i,
      },
    },
  },
  {
    tableName: "utilisateurs",
    timestamps: true,
  },
);

Utilisateur.beforeCreate(async (utilisateur) => {
  if (utilisateur.mot_de_passe) {
    const salt = await bcrypt.genSalt(10);
    // eslint-disable-next-line no-param-reassign
    utilisateur.mot_de_passe = await bcrypt.hash(
      utilisateur.mot_de_passe,
      salt,
    );
  }
});

Utilisateur.beforeUpdate(async (utilisateur) => {
  if (utilisateur.mot_de_passe) {
    const salt = await bcrypt.genSalt(10);
    // eslint-disable-next-line no-param-reassign
    utilisateur.mot_de_passe = await bcrypt.hash(
      utilisateur.mot_de_passe,
      salt,
    );
  }
});

Utilisateur.prototype.verifierMotDePasse = async function (motDePasse) {
  return bcrypt.compare(motDePasse, this.mot_de_passe);
};

module.exports = Utilisateur;

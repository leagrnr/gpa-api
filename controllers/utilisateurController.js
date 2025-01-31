const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/utilisateurModel");
// const Client = require("../models/clientModel");
// const Fournisseur = require("../models/fournisseurModel");
// const Commercial = require("../models/commercialModel");
// const Admin = require("../models/administrateurModel");
// const Livreur = require("../models/livreurModel");
// const Commande = require("../models/commandeModel");

const { SECRET_KEY } = process.env;

const utilisateurController = {
  // eslint-disable-next-line consistent-return
  login: async (req, res) => {
    try {
      // eslint-disable-next-line camelcase
      const { email, mot_de_passe } = req.body;

      const utilisateurEmail = await Utilisateur.findOne({ where: { email } });
      const utilisateurMotDePasse = await Utilisateur.findOne({
        where: { mot_de_passe },
      });

      if (!utilisateurEmail) {
        return res.status(401).json({ message: "Email incorrect." });
      }
      if (!utilisateurMotDePasse) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      const token = jwt.sign(
        {
          id: utilisateurEmail.idUtilisateur,
          email: utilisateurEmail.email,
          role: utilisateurEmail.role,
        },
        SECRET_KEY,
        { expiresIn: "1h" },
      );

      res.json({ token, message: "Connexion réussie !" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la connexion.",
        error: error.message,
      });
    }
  },

  getUsersByRole: async (req, res) => {
    const { role } = req.params;
    try {
      const utilisateurs = await Utilisateur.findAll({ where: { role } });
      res.json(utilisateurs);
    } catch (error) {
      console.error("Error retrieving users by role:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des utilisateurs.",
        error: error.message || "Unknown error",
      });
    }
  },

  // eslint-disable-next-line consistent-return
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const utilisateur = await Utilisateur.findByPk(id);
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.json(utilisateur);
    } catch (error) {
      console.error("Error retrieving user by id:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'utilisateur.",
        error: error.message || "Unknown error",
      });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, mot_de_passe, role, telephone } = req.body;
    try {
      const utilisateur = await Utilisateur.findByPk(id);
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      await utilisateur.update({
        nom,
        prenom,
        email,
        mot_de_passe,
        role,
        telephone,
      });
      res.json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour de l'utilisateur.",
        error: error.message || "Unknown error",
      });
    }
  },

  deleteUser: async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      // await Commande.destroy({ where: { idUtilisateur: userId } });
      // await Client.destroy({ where: { idUtilisateur: userId } });
      const deletedRows = await Utilisateur.destroy({
        where: { idUtilisateur: userId },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({
        message: "Erreur lors de la suppression de l'utilisateur.",
        error: error.message,
      });
    }
  },


};

module.exports = utilisateurController;

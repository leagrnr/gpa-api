const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/utilisateurModel");

const { SECRET_KEY } = process.env;

const utilisateurController = {
  login: async (req, res) => {
    try {
      // eslint-disable-next-line camelcase
      const { email, mot_de_passe } = req.body;

      const utilisateur = await Utilisateur.findOne({ where: { email } });

      if (!utilisateur) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      const motDePasseValide =
        await utilisateur.verifierMotDePasse(mot_de_passe);
      if (!motDePasseValide) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect." });
      }

      const token = jwt.sign(
        {
          idUtilisateur: utilisateur.idUtilisateur,
          email: utilisateur.email,
          role: utilisateur.role,
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
};

module.exports = utilisateurController;

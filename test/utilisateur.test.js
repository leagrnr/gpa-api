const jwt = require("jsonwebtoken");
const {
  login,
  getUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/utilisateurController");
const Utilisateur = require("../models/utilisateurModel");

jest.mock("../models/utilisateurModel");
jest.mock("jsonwebtoken");

describe("utilisateurController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("login", () => {
    beforeEach(() => {
      req.body = {
        email: "test@example.com",
        mot_de_passe: "password123",
      };
    });

    it("should return 401 if email is incorrect", async () => {
      Utilisateur.findOne.mockResolvedValueOnce(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Email incorrect." });
    });

    it("should return 401 if password is incorrect", async () => {
      Utilisateur.findOne
        .mockResolvedValueOnce({ idUtilisateur: 1, email: "test@example.com" })
        .mockResolvedValueOnce(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Mot de passe incorrect.",
      });
    });

    it("should return a token if login is successful", async () => {
      const user = {
        idUtilisateur: 1,
        email: "test@example.com",
        role: "user",
      };
      Utilisateur.findOne
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce(user);
      jwt.sign.mockReturnValue("fakeToken");

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({
        token: "fakeToken",
        message: "Connexion réussie !",
      });
    });

    it("should return 500 if there is an error", async () => {
      Utilisateur.findOne.mockRejectedValueOnce(new Error("Database error"));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erreur lors de la connexion.",
        error: "Database error",
      });
    });
  });

  describe("getUsersByRole", () => {
    it("should return users by role", async () => {
      req.params.role = "user";
      const users = [{ idUtilisateur: 1, role: "user" }];
      Utilisateur.findAll.mockResolvedValueOnce(users);

      await getUsersByRole(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 500 if there is an error", async () => {
      req.params.role = "user";
      Utilisateur.findAll.mockRejectedValueOnce(new Error("Database error"));

      await getUsersByRole(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erreur lors de la récupération des utilisateurs.",
        error: "Database error",
      });
    });
  });

  describe("getUserById", () => {
    it("should return user by ID", async () => {
      req.params.id = 1;
      const user = { idUtilisateur: 1 };
      Utilisateur.findByPk.mockResolvedValueOnce(user);

      await getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 if user not found", async () => {
      req.params.id = 1;
      Utilisateur.findByPk.mockResolvedValueOnce(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Utilisateur non trouvé.",
      });
    });

    it("should return 500 if there is an error", async () => {
      req.params.id = 1;
      Utilisateur.findByPk.mockRejectedValueOnce(new Error("Database error"));

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erreur lors de la récupération de l'utilisateur.",
        error: "Database error",
      });
    });
  });

  describe("updateUser", () => {
    beforeEach(() => {
      req.params.id = 1;
      req.body = {
        nom: "Doe",
        prenom: "John",
        email: "john.doe@example.com",
        mot_de_passe: "newpassword123",
        role: "user",
        telephone: "+33612345678",
      };
    });

    it("should update user successfully", async () => {
      const user = { idUtilisateur: 1, update: jest.fn() };
      Utilisateur.findByPk.mockResolvedValueOnce(user);

      await updateUser(req, res);

      expect(user.update).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({
        message: "Utilisateur mis à jour avec succès.",
      });
    });

    it("should return 404 if user not found", async () => {
      Utilisateur.findByPk.mockResolvedValueOnce(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Utilisateur non trouvé.",
      });
    });

    it("should return 500 if there is an error", async () => {
      Utilisateur.findByPk.mockRejectedValueOnce(new Error("Database error"));

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erreur lors de la mise à jour de l'utilisateur.",
        error: "Database error",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      req.params.id = 1;
      Utilisateur.destroy.mockResolvedValueOnce(1);

      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    it("should return 404 if user not found", async () => {
      req.params.id = 1;
      Utilisateur.destroy.mockResolvedValueOnce(0);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is an error", async () => {
      req.params.id = 1;
      Utilisateur.destroy.mockRejectedValueOnce(new Error("Database error"));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erreur lors de la suppression de l'utilisateur.",
        error: "Database error",
      });
    });
  });
});

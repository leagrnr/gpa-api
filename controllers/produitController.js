const Produit = require("../models/produitModel");

const produitController = {
  create: async (req, res) => {
    try {
      const { nom, description, prix, stock, categorie } = req.body;
      const produit = await Produit.create({
        nom,
        description,
        prix,
        stock,
        categorie,
      });
      res.status(201).json(produit);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Erreur lors de la création du produit.",
        error: error.message || "Unknown error",
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const produits = await Produit.findAll();
      res.json(produits);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des produits.",
        error: error.message || "Unknown error",
      });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        return res.status(404).json({ message: "Produit non trouvé." });
      }
      res.json(produit);
    } catch (error) {
      console.error("Error retrieving product by id:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du produit.",
        error: error.message || "Unknown error",
      });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { nom, description, prix, stock, categorie } = req.body;
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        return res.status(404).json({ message: "Produit non trouvé." });
      }
      await produit.update({ nom, description, prix, stock, categorie });
      res.json({ message: "Produit mis à jour avec succès." });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du produit.",
        error: error.message || "Unknown error",
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const produit = await Produit.findByPk(id);
      if (!produit) {
        return res.status(404).json({ message: "Produit non trouvé." });
      }
      await produit.destroy();
      res.json({ message: "Produit supprimé avec succès." });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du produit.",
        error: error.message || "Unknown error",
      });
    }
  },
};

module.exports = produitController;

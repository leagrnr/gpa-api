module.exports = {
  components: {
    schemas: {
      Produit: {
        type: "object",
        properties: {
          idProduit: {
            type: "integer",
            description: "Identifiant unique du produit",
            example: 1,
          },
          nom: {
            type: "string",
            description: "Nom du produit",
            example: "Sécateur",
          },
          description: {
            type: "string",
            description: "Description du produit",
            example: "Grand Sécateur de jardin",
          },
          prix: {
            type: "number",
            format: "float",
            description: "Prix du produit",
            example: 19.99,
          },
          stock: {
            type: "integer",
            description: "Quantité en stock",
            example: 100,
          },
        },
      },
    },
  },

  paths: {
    "api/products": {
      get: {
        summary: "Récupérer tous les produits",
        tags: ["Produit"],
        responses: {
          200: {
            description: "Liste des produits",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Produit",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Créer un nouveau produit",
        tags: ["Produit"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Produit",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Produit créé avec succès",
          },
        },
      },
    },

    "api/products/:id": {
      get: {
        summary: "Récupérer un produit par ID",
        tags: ["Produit"],
        parameters: [
          {
            name: "idProduit",
            in: "path",
            required: true,
            description: "ID du produit",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Produit trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Produit",
                },
              },
            },
          },
          404: {
            description: "Produit non trouvé",
          },
        },
      },

      put: {
        summary: "Mettre à jour un produit",
        tags: ["Produit"],
        parameters: [
          {
            name: "idProduit",
            in: "path",
            required: true,
            description: "ID du produit à mettre à jour",
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Produit",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Produit mis à jour avec succès",
          },
          404: {
            description: "Produit non trouvé",
          },
        },
      },

      delete: {
        summary: "Supprimer un produit",
        tags: ["Produit"],
        parameters: [
          {
            name: "idProduit",
            in: "path",
            required: true,
            description: "ID du produit à supprimer",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          204: {
            description: "Produit supprimé avec succès",
          },
          404: {
            description: "Produit non trouvé",
          },
        },
      },
    },
  },
};

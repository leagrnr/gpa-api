module.exports = {
  components: {
    schemas: {
      Utilisateur: {
        type: "object",
        properties: {
          idUtilisateur: {
            type: "integer",
            description: "Identifiant unique de l'utilisateur",
            example: 1,
          },
          nom: {
            type: "string",
            description: "Nom de l'utilisateur",
            example: "Doe",
          },
          prenom: {
            type: "string",
            description: "Prénom de l'utilisateur",
            example: "John",
          },
          email: {
            type: "string",
            description: "Email unique de l'utilisateur",
            example: "john.doe@example.com",
          },
          mot_de_passe: {
            type: "string",
            description: "Mot de passe hashé de l'utilisateur",
            example: "$2b$10$... (hash bcrypt)",
          },
          role: {
            type: "string",
            enum: [
              "Fournisseur",
              "Commercial",
              "Client",
              "Livreur",
              "Administrateur",
            ],
            description: "Rôle de l'utilisateur",
            example: "Client",
          },
          telephone: {
            type: "string",
            description: "Numéro de téléphone de l'utilisateur",
            example: "+33612345678",
          },
        },
      },
    },
  },

  paths: {
    "/utilisateurs": {
      get: {
        summary: "Récupérer tous les utilisateurs",
        tags: ["Utilisateur"],
        responses: {
          200: {
            description: "Liste des utilisateurs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Utilisateur",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Créer un nouvel utilisateur",
        tags: ["Utilisateur"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Utilisateur",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Utilisateur créé avec succès",
          },
        },
      },
    },

    "/utilisateurs/{idUtilisateur}": {
      get: {
        summary: "Récupérer un utilisateur par ID",
        tags: ["Utilisateur"],
        parameters: [
          {
            name: "idUtilisateur",
            in: "path",
            required: true,
            description: "ID de l'utilisateur",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Utilisateur trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Utilisateur",
                },
              },
            },
          },
          404: {
            description: "Utilisateur non trouvé",
          },
        },
      },

      put: {
        summary: "Mettre à jour un utilisateur",
        tags: ["Utilisateur"],
        parameters: [
          {
            name: "idUtilisateur",
            in: "path",
            required: true,
            description: "ID de l'utilisateur à mettre à jour",
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
                $ref: "#/components/schemas/Utilisateur",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Utilisateur mis à jour avec succès",
          },
          404: {
            description: "Utilisateur non trouvé",
          },
        },
      },

      delete: {
        summary: "Supprimer un utilisateur",
        tags: ["Utilisateur"],
        parameters: [
          {
            name: "idUtilisateur",
            in: "path",
            required: true,
            description: "ID de l'utilisateur à supprimer",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          204: {
            description: "Utilisateur supprimé avec succès",
          },
          404: {
            description: "Utilisateur non trouvé",
          },
        },
      },
    },
  },
};

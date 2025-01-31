const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Importation des fichiers de documentation
const utilisateurDoc = require("../documentation/utilisateur.doc");
const produitDoc = require("../documentation/produit.doc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
    ],
    components: {
      schemas: {
        ...utilisateurDoc.components.schemas,
        ...produitDoc.components.schemas,
      },
    },
    paths: {
      ...utilisateurDoc.paths,
      ...produitDoc.paths,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger disponible sur http://localhost:3000/api-docs");
};

module.exports = swaggerDocs;

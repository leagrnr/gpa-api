const coupures = {
  EUR: [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
  USD: [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01],
};

function getTypeOfDenomination(valeur) {
  return valeur >= 5 ? "billet" : "pièce";
}

function determineCoupureGeneric(params) {
  const defaultParams = { montant: 0, typeDevise: "EUR" };
  params = { ...defaultParams, ...params };
  const { montant, typeDevise } = params;

  if (montant <= 0 || typeof montant !== "number") {
    return "Veuillez entrer un montant positif.";
  }

  const coupuresList = coupures[typeDevise];
  const repartition = {};
  let montantRestant = montant;

  for (const valeur of coupuresList) {
    const nombre = Math.floor(montantRestant / valeur);
    if (nombre > 0) {
      repartition[valeur] = nombre;
      montantRestant = (montantRestant % valeur).toFixed(2);
    }
  }

  let message = `${montant} ${typeDevise}\nBillets :\n`;
  let hasBillets = false;

  for (const valeur in repartition) {
    if (getTypeOfDenomination(valeur) === "billet" && valeur >= 5) {
      hasBillets = true;
      message += `${repartition[valeur]} billet${repartition[valeur] > 1 ? "s" : ""} de ${valeur} ${typeDevise}\n`;
    }
  }
  if (!hasBillets) message += "Aucun billet nécessaire\n";

  message += "\nPièces :\n";
  let hasPieces = false;

  for (const valeur in repartition) {
    if (getTypeOfDenomination(valeur) === "pièce") {
      hasPieces = true;
      if (valeur >= 1) {
        message += `${repartition[valeur]} pièce${repartition[valeur] > 1 ? "s" : ""} de ${valeur} ${typeDevise}\n`;
      } else {
        const centimes = (valeur * 100).toFixed(0);
        message += `${repartition[valeur]} pièce${repartition[valeur] > 1 ? "s" : ""} de ${centimes} centime${centimes > 1 ? "s" : ""}\n`;
      }
    }
  }
  if (!hasPieces) message += "Aucune pièce nécessaire\n";

  return message;
}

module.exports = determineCoupureGeneric;

db.inventory.updateMany(
  // 1. Requête
  { tags: { $exists: true } },

  // 2. Tableau -> Pipeline d'aggregation
  [
    {
      // Opérateurs d'aggregation ($set, $match, …)
      $set: {
        // Le champs que l'on va modifier est le champs 'label'
        label: {
          // Début du $switch
          $switch: {
            branches: [
              // En fonction de la valeur du champs '$type', on génère une nouvelle valeur
              { case: { $gt: [{ $size: "$tags" }, 3] }, then: "AA" },
              { case: { $gt: [{ $size: "$tags" }, 1] }, then: "A" },
            ],
            default: "B",
          },
        },
      },
    },

    //   { $set: { totalTags: { $size: "$tags" } } }
  ]
);

db.inventory.find(
  { tags: { $exists: true } },
  { tags: 1, label: 1, /* totalTags: 1, */ _id: 0 }
);

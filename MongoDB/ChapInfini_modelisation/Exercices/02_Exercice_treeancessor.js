function addParents(_id, doc){
  if (doc.parent) {
    print(`parent : ${doc.parent} id : ${_id}`);

    // ajout du parent direct
    db.categoriestree.updateOne(
      { _id: _id },
      { $addToSet: { ancestors: { _id: doc.parent } } }
    );

    // fonction récursive
    addParents(_id, db.categoriestree.findOne({ _id: doc.parent }));
  }
};

db.categoriestree.find().forEach((doc) => {
  addParents(doc._id, doc);
});


// autre exemple avec while

function addAncestors() {
  const categories = db.categoriestree.find({});
  categories.forEach(category => {
     let parent = category.parent;
     while (parent != null) {
        db.categoriestree.updateOne({ _id: category._id }, { $addToSet: { ancestors: parent } });
        let parentCategory = db.categoriestree.findOne({ _id: parent });
        parent = parentCategory.parent;
     }
  });
}

//autre exemple avec graphLookUp
db.categoriestree.aggregate([
  {
      $graphLookup: {
          from: "categoriestree",
          startWith: "$parent",
          connectFromField: "parent",
          connectToField: "_id",
          as: "ancestors"
      }
  }
]).forEach(doc => {
  doc.ancestors.forEach(ancestor => {
      db.categoriestree.updateOne(
          { _id: doc._id },
          { $addToSet: { ancestors: ancestor._id } }
      )
  })
});

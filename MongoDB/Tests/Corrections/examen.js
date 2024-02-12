// 01. Combien y a t il de restaurants qui font de la cuisine Française et qui ont eu un score de 10 au moins ?

db.restaurants.find({
    $and: [
        {
            cuisine: "French"
        },
        {
            "grades.score": {
                $gte: 10
            }
        }
    ]
}).count();

//02 Quels sont les restaurants qui ont eu un grade B ? Affichez uniquement les noms et ordonnez les par ordre décroissant. Affichez le nombre de résultat.

let count = 0;
db.restaurants.find({
    "grades.grade": "B"
},
    {
        _id: 0,
        name: 1
    }).sort({
        name: 1
    }).forEach(doc => {
        print(doc.name);
        print();
        count++;
    });

print(count);

// Vous pouvez également le faire avec une aggrégation (facultatif)
db.restaurants.aggregate(
    { $match: { "grades.grade": "B" } },
    { $project: { name: 1, _id: 0 } },
    { $sort: { name: 1 } },
    { $group: { _id: null, count: { $sum: 1 }, names: { $push: { $concat: ["$name", " "] } } } }
);

// 03 Quels sont les restaurants qui ont eu 4 appréciations ? 

db.restaurants.find({ grades: { $size: 4 } }, { _id: 0, name: 1 }).pretty();

//04 Suite de la question 03. Sont-ils les plus nombreux dans ny, proposez une solution pour répondre à cette question.
db.restaurants.aggregate([
    { $project: { count: { $size: "$grades" } } },
    { $group: { _id: "$count", countGrade: { $sum: 1 } } },
    { $sort: { countGrade: -1 } },
    { $limit: 1 },
]).forEach(function ({ _id, countGrade }) {
    print(`grades : ${_id} nb : ${countGrade}`);
})

const stat = {};
db.restaurants.find({
    grades: { $exists: true }
}, {
    _id: 0,
    count: { $size: "$grades" }
}).sort({ count : -1 }).forEach(function (doc) {
    const count = doc.count;
    if(typeof stat[count] === 'undefined'){
        stat[count] = 1;
    }else{
        stat[count]++;
    }
});

const maxG = Math.max( ...Object.values(stat) );

for(const [g, n] of Object.entries(stat)){
    if( n === maxG) {
        print(g, n)
        break;
    }
}

//  05 Trouvez, si il(s) existe(nt) tous les restaurants dans le quartier du Bronx qui ont eu 1 grades.
db.restaurants.find({borough : "Bronx", grades : { $size : 1}}, { name : 1, _id : 0});

//  06 Trouvez tous les restaurants dont leurs noms ne dépasse pas 15 caractères.
db.restaurants.find({ 
    name: { $exists: true },
    $expr: { $gt: [{ $strLenCP: '$name' }, 15] } 
},{ name : 1, _id : 0}
)

// 07. Sélectionnez les restaurants dont le grade est A ou B dans le Bronx.
db.restaurants.find({"grades.grade" : { $in : ["A", "B"]}, borough: "Bronx"}, { name : 1, _id : 0});

// 08. Combien y-a-t-il de restaurants qui ont eu plus de 4 appréciations (grades). Utilisez l'opérateur ci-dessous pour répondre à cette question. (voir la documentation)
db.restaurants.find({ 
    $expr: { $gt: [{ $size: '$grades' }, 4] } 
}
).count()

// 09. Sélectionnez maintenant tous les restaurants qui ont les lettres "ff" dans leur nom.
db.restaurants.find({name : /ff/}, { _id : 0, name : 1})

// 10. Sélectionnez maintenant tous les restaurants qui ont les lettres "ff" ou "ee" dans leur nom.
db.restaurants.find({name : /ff|ee/}, { _id : 0, name : 1})

// 11. comptez le nombre de restaurants par type de cuisine.
db.restaurants.aggregate([
    { $group: { _id: "$cuisine", total: { $sum: 1 } } },
]);
// 01
db.restaurants.aggregate([
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            },
            names: { $push: { name: "$name", restaurant_id: "$restaurant_id" } }
        },
    },
    { $limit: 2 }
])

// 02
db.restaurants.aggregate([
    { $match: { cuisine: "Italian" } },
    {
        $group: {
            _id: {
                "borough": "$borough"
            },
            names: { $push: "$name" }
        }
    }
]).pretty()


// 03

resto.aggregate([
    {$project:{_id:0, name:1, moyenne:{$avg:"$grades.score"}}},
    {$sort:{"moyenne": -1}}
])

//OU 

db.restaurants.aggregate([
    { $unwind: "$grades" },
    { $group: { _id: "$name", avg_by_restaurant: { $avg: "$grades.score" } } },
    { $sort: { avg_by_restaurant: -1 } }
]).pretty()



// Moyenne des scores par quartier et type de restaurant
db.restaurants.aggregate([
    { $unwind: "$grades" },
    {
        $group: {
            _id: {
                "borough": "$borough",
                "cuisine": "$cuisine"
            },
            avg: { $avg: "$grades.score" }
        }
    },
    {
        $sort: {
            avg: -1
        }
    }
])

// 04
db.restaurants.aggregate([
    { $match: {cuisine: "Italian" }},
    { $project: {
        _id: 0,
        cuisine: "$cuisine",
        name: "$name",
        average: { $avg: "$grades.score" },
        grades: 1,
    }},
    { $sort: { "average": -1 } },
    { $limit: 5 },
    { $out: "top5" },
]);

//OU 

db.restaurants.aggregate([
    { $match: { cuisine: "Italian" } },
    { $unwind: "$grades" },
    {
        $project: {
            _id:0,
            name: "$name",
            avg: { $avg: "$grades.score" },
        },

    },
    { $sort: { avg: -1 } },
    { $limit: 5 },
    { $out: "top5" }
]).pretty();

// 05 Correction
db.restaurants.aggregate([
    // les restaurants qui ont un score au moins supérieur à 30 identique à un WHERE en MySQL
    { $match: { "grades.score": { $gte: 30 } } },
    {
        $group: {
            _id: "$borough",// agrégation des données par quartier => crée des sous-ensemble
            totalRestaurant: { $sum: 1 }, // fonction agrégation sur les sous-ensembles
            cuisines: { $addToSet: "$cuisine" } // ajouter dans un tableau de manière unique chaque type de restaurants
            // cuisines : { $push : "$cuisne" } // on aurait dans ce cas eu des doublons de type 
        }
    },
    {
        $sort: {
            totalRestaurant: -1
        }
    }
])

//OU


db.restaurants.aggregate([
    { $match: {"grades.score":{$gte: 30}}},
    { $group: {_id: {"cuisine": "$cuisine","borough": "$borough"},somme: { $sum: 1}}},
    { $sort: {somme:-1}}
])

// 06
db.restaurants.aggregate([
    { $unwind: "$grades" },
    { $match: { "grades.score": { $exists: true }, "grades.score": { $not: { $lt: 30 } } } },
    {
        $group: {
            _id: {
                "borough": "$borough"
            },
            names: {
                $push: {
                    name: "$name",
                    avg: {
                        $avg: "$grades.score"
                    },
                }
            },
        },
    },
    { $project: { _id: 1, names: 1 } },
    { $sort: { "grades.score": - 1 } }
]).pretty()
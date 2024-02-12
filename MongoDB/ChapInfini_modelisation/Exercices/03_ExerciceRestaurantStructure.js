const cuisines = db.restaurants.distinct("cuisine")
const boroughs = db.restaurants.distinct("borough")

function insertCuisines() {
    cuisines.forEach(cuisine => db.cuisine.insertOne({name: cuisine}));
}

function insertBoroughs() {
    boroughs.forEach(borough => db.borough.insertOne({name: borough}));
}

function associateRestaurantsWithCuisines() {
    db.restaurants.find({}).forEach( restaurant => {
        let cuisine = restaurant.cuisine;
        let cuisineId = db.cuisine.findOne({name: cuisine})._id;
        db.restaurants.updateOne({_id: restaurant._id}, {$set: {cuisine_id: cuisineId}});
    })
}

function associateRestaurantsWithBoroughs() {
    db.restaurants.find({}).forEach( restaurant => {
        let borough = restaurant.borough;
        let boroughId = db.borough.findOne({name: borough})._id;
        db.restaurants.updateOne({_id: restaurant._id}, {$set: {borough_id: boroughId}});
    })
}
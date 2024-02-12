const { getCollection } = require('./database');

const express = require('express');
const router = new express.Router()

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/stats", getStats);
router.get("/restos", getRestos);
router.get("/explore", getExplore);

/**
 * Déclaration des controlleurs de l'app
 */


/**
 * GET /
 * Page d'accueil
 */
async function getHome(req, res) {
  res.render('index');
}

/**
 * GET /stats
 * Page d'affichage de statistiques
 */
async function getStats(req, res) {
  const db = getDBObject();

  const restaurants = await db.collection('restaurants');

  const nbRestaurants = await restaurants
    .aggregate([
      {
        $group: {
          _id: null,
          nbRestaurants: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const bestRestaurants = await restaurants
    .aggregate([
      { $match: {
        grades: { $exists: true }
      } },

      { $project: {
        name: 1,
        avg: { $avg: '$grades.score' }
      } },

      { $sort: { avg: -1 } },

      { $limit: 10 }
    ])
    .toArray();

  console.log('bestRestaurants =', bestRestaurants)

  const boroughs = await restaurants.distinct('borough');
  const cuisines = await restaurants.distinct('cuisine');

  res.render('stats.pug', {
    nbRestaurants: nbRestaurants[0].nbRestaurants,
    boroughs: boroughs,
    cuisines: cuisines,
    bestRestaurants: bestRestaurants
  });
}

/**
 * GET /restos
 * Page permettant de rechercher un restaurant
 */
async function getRestos (req, res) {
  
  let viewData = {};

  // Récupérer les données de la QueryString
  const { searchString } = req.query;

  if (searchString) {
    // Récupère l'objet Collection 'restaurants' de la base Mongo
    const restaurants = await getCollection("restaurants");

    const results = await restaurants.find({
      name: new RegExp(searchString, 'ig')
    }).sort({ name: 1 }).limit(20).toArray();

    viewData = { results, searchString };
  }

  res.render("restos", viewData);
  
}

/**
 * GET /explore
 * Page permettant d'explorer les restaurants par cuisine/quartier
 */
async function getExplore (req, res) {

  let viewData = {};

  // Récupère l'objet Collection 'restaurants' de la base Mongo
  const restaurants = await getCollection("restaurants");

  // Parallèlisation des promesses pour un gain de temps
  const [boroughs, cuisines] = await Promise.all([
    restaurants.distinct("borough"),
    restaurants.distinct("cuisine")
  ]);

  viewData = {
    boroughs,
    cuisines
  };

  // Récupération des éléments de la Query String
  const {
    borough: selectedBorough,
    cuisine: selectedCuisine
  } = req.query;
  
  if (selectedBorough && selectedCuisine) {
    const results = await restaurants.find({
      borough: selectedBorough,
      cuisine: selectedCuisine,
    }).toArray();

    viewData = {
      ...viewData,
      results,
      selectedBorough,
      selectedCuisine
    };
  }

  res.render("explore", viewData);
}








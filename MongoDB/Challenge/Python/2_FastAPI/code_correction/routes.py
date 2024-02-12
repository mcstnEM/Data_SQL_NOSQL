from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
import pydantic

from bson import ObjectId
# conversion des objetsId en chaine de caractères 
pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str

from models import Restaurant, RestaurantUpdate

router = APIRouter()

@router.get("/list", response_description="List all restaurants", )
def list_restaurants(request: Request):
    restaurants = list(request.app.db["restaurants"].find({},{"_id":1}).limit(10))
    return restaurants

@router.get("/{search}", response_description="Recherche restaurant")
def search_restaurants(request: Request, search: str):
    restaurants = list(request.app.db["restaurants"].find({'name': {'$regex': search, '$options': 'i'}},{"name":1}).limit(10))
    return restaurants

@router.put("/update/{id}", response_description="Modification d'un restaurant")
def update_restaurant(request: Request, id: str):
    oid = ObjectId(id)
    request.app.db["restaurants"].update_one({'_id': oid}, { "$set": { "status": "updated" } })
    return id

@router.post("/", response_description="Create a new restaurant", status_code=status.HTTP_201_CREATED, response_model=Restaurant)
def create_restaurant(request: Request, restaurant: Restaurant = Body()):
    restaurant = jsonable_encoder(restaurant)
    new_restaurant = request.app.db["restaurants"].insert_one(restaurant)
    created_restaurant = request.app.db["restaurants"].find_one(
        {"_id": new_restaurant.inserted_id}
    )
    return created_restaurant
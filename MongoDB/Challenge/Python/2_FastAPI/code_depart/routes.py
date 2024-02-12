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
	return search


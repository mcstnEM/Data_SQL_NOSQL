from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient
from routes import router as restaurant_router

app = FastAPI()
@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient("localhost",27017)
    app.db = app.mongodb_client.ny
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(restaurant_router, tags=["restaurants"], prefix="/restaurants")
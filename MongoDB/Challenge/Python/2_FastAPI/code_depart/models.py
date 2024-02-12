import uuid
from typing import Optional
from pydantic import BaseModel, Field, validator
from bson.objectid import ObjectId


class ObjectId(ObjectId):
    pass
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise TypeError('ObjectId required')
        return str(v)


class Restaurant(BaseModel):
    _id: ObjectId
    address:str
    borough: str
    cuisine: str
    grades:Optional[list] 
    name:str
    restaurant_id:int



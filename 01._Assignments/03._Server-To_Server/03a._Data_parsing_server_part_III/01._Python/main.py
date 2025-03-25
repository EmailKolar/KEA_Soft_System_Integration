from fastapi import FastAPI
import os
import json
import requests


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/json")
def read_json():
    with open('./data/data.json', 'r', encoding='utf-8') as file:
        data = file.read()
    return json.loads(data)


@app.get("/expressData/{type}")
def read_express_data(type: str):
    response = requests.get(f'http://127.0.0.1:8080/{type}')
    return response.json()
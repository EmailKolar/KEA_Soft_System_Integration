from fastapi import FastAPI
import requests
import json 
app = FastAPI()

@app.get("/requestExpressData")
def requestExpressData():
    response = requests.get('http://127.0.0.1:8080/expressData')
    return response.json()






@app.get("/fastapiData")
def getFastAPIData():
    return { "data": "Data fomr FastAPI"}


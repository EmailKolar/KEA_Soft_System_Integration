from fastapi import FastAPI
#poetry init -n
#poetry add uvicorn fastapi
#poetry shell
#uvicorn main:app --reload

app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello World"}

@app.get("/greetings")
def greetings():
    return {"data":"Hello there friendo"}


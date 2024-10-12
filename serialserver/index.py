from fastapi import FastAPI, WebSocket
import logging
from contextlib import asynccontextmanager

from fastapi.responses import HTMLResponse
import uvicorn
from dotenv import dotenv_values
from serialWriter import serialWriter



config = dotenv_values(".env")  



logging.basicConfig(level=logging.DEBUG)   # add this line
logger = logging.getLogger()

myWriter = serialWriter(config['USB_PORT'], config['BAUD_RATE'])




app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data =  bytes(data, encoding="utf-8")
        print(type( data.split(b',')))
        data = data.split(b',')
        myWriter.writeToPort(message=data)
        await websocket.send_text(f"Message text was: {data}")


if __name__ == "__main__":
    uvicorn.run("index:app", port=5000)

from fastapi import FastAPI, WebSocket
import logging
from contextlib import asynccontextmanager
import sdnotify

from fastapi.responses import HTMLResponse
import uvicorn
from dotenv import dotenv_values
from serialWriter import serialWriter


n = sdnotify.SystemdNotifier()
config = dotenv_values(".env")  



logging.basicConfig(level=logging.DEBUG)   # add this line
logger = logging.getLogger()

myWriter = serialWriter(config['USB_PORT'], config['BAUD_RATE'])




app = FastAPI()

#@asynccontextmanager
#async def lifespan(app: FastAPI):
#  n.notify("READY=1")




@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        logger.info(data)
        data = data.split(',')
        myWriter.writeToPort(message=data)
        await websocket.send_text(f"Message text was: {data}")


if __name__ == "__main__":
    uvicorn.run("index:app", port=5000)

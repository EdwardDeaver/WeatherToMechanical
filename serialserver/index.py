from fastapi import FastAPI, WebSocket
#import logging
from contextlib import asynccontextmanager
import sdnotify

from fastapi.responses import HTMLResponse
import uvicorn
from dotenv import dotenv_values
from serialWriter import serialWriter
import logging
import logging_loki
import time
from datetime import datetime, timezone

# create a new logger instance, name it whatever you wan
n = sdnotify.SystemdNotifier()
config = dotenv_values(".env")  



graf_user = config["USERNAME_GRAFANA"]
graf_pass = config["PASSWORD_GRAFANA"]

#print(graf_user)
#print(graf_pass)
handler = logging_loki.LokiHandler(
    url="https://logs-prod-021.grafana.net/loki/api/v1/push", 
    tags={"application": "my-app"},
    auth=(graf_user, graf_pass)
    , version="2")
print(handler)
logger = logging.getLogger("my-logger")
logger.addHandler(handler)


#logging.basicConfig(level=logging.DEBUG)   # add this line
#logger = logging.getLogger("keenan-flipdigit")

myWriter = serialWriter(config['USB_PORT'], config['BAUD_RATE'])




app = FastAPI()

#@asynccontextmanager
#async def lifespan(app: FastAPI):
#  n.notify("READY=1")




@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            logger.info(data,   extra={"tags":{"service": "ws-server", "version": "1.0.0"}})
            data = data.split(',')
            logger.info(data,   extra={"tags":{"service": "ws-server", "version": "1.0.0"}})
            myWriter.writeToPort(message=data)
            await websocket.send_text(f"Message text was: {data}")
        except Exception as E:
            logger.error(E,  extra={"tags":{"service": "ws-server", "version": "1.0.0"}})


if __name__ == "__main__":
    uvicorn.run("index:app", host='0.0.0.0', port=5000)

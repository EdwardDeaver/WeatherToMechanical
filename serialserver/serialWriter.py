import serial
import serial.tools.list_ports
import logging
import sys
import logging_loki
from dotenv import dotenv_values

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

#myWriter = serialWriter(config['USB_PORT'], config['BAUD_RATE'])





class serialWriter:
    serialPort =''
    def __init__(self, USB_PORT: str, BAUD_RATE: int) -> None:
        try:
            self.serialPort = serial.Serial(USB_PORT,
    baudrate=57600,
    timeout=1,
	parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS)
            self.serialPort.isOpen()
        except Exception as e:
            print(e)
            logger.error(e,extra={"tags": {"service": "serial-writer"}})
            sys.exit(1)
    def writeToPort(self, message: bytearray):
        numbers = [] 
        numbers.append(0x80)
        numbers.append(0x83)
        numbers.append(0x00)

        for i in range(1, 29):
            print(i)
            numbers.append(0x0f)
        numbers.append(0x8F)

        numbers=bytes(numbers)

        print(numbers)  

        logger.info(numbers, extra={"tags": {"service": "serial-writer"}})
        numbersMessage = []
        for i in message:
            numbersMessage.append(int(i))
            
        numberBytes = bytes(numbersMessage)
        logger.info(numberBytes, extra={"tags": {"service": "serial-writer"}})
        self.serialPort.write(numberBytes)



 
        

        

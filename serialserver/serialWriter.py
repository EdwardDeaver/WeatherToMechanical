import serial
import serial.tools.list_ports
class serialWriter:
    serialPort =''
    def __init__(self, USB_PORT: str, BAUD_RATE: int) -> None:
        self.serialPort = serial.Serial(
        port=USB_PORT,
        baudrate=BAUD_RATE,
        timeout=1,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS)
        self.serialPort.isOpen()

    def writeToPort(self, message: bytearray):
        for i in message:    
            self.serialPort.write(i)
        

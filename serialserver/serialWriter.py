import serial
import serial.tools.list_ports
class serialWriter:
    serialPort =''
    def __init__(self, USB_PORT: str, BAUD_RATE: int) -> None:
        self.serialPort = serial.Serial(
            port="/dev/tty.usbserial-B001BJRJ",
    baudrate=57600,
    timeout=1,
	parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS)
        self.serialPort.isOpen()

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


        numbersMessage = []
        for i in message:
            numbersMessage.append(int(i))
            
        numberBytes = bytes(numbersMessage)
        self.serialPort.write(numberBytes)


\
 
        

        

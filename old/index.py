import time
import serial


import serial.tools.list_ports
ports = serial.tools.list_ports.comports()

for port, desc, hwid in sorted(ports):
        print("{}: {} [{}]".format(port, desc, hwid))
# configure the serial connections (the parameters differs on the device you are connecting to)
ser = serial.Serial(
    port="/dev/tty.usbserial-B001BJRJ",
    baudrate=57600,
    timeout=1,
	parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS
)

ser.isOpen()


numbers = [] 
numbers.append(0x80)
numbers.append(0x83)
numbers.append(0x00)

for i in range(1, 29):
    print(i)
    numbers.append(0x00)
numbers.append(0x8F)

numbers=bytes(numbers)    
print(numbers)
ser.write(numbers)

time.sleep(4.0)

numbers = [] 
numbers.append(0x80)
numbers.append(0x83)
numbers.append(0x00)

numbers.append(91)
numbers.append(127)
numbers.append(8)

numbers.append(51)
numbers.append(95)
numbers.append(8)
numbers.append(8)

numbers.append(91)
numbers.append(112)
for i in range(10, 29):
    print(i)
    numbers.append(0x00)
numbers.append(0x8F)

numbers=bytes(numbers)    
print(numbers)
ser.write(numbers)

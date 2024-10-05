# Weather To Mechanical
#### Takes weather data and puts it on my 7x4 (Row x Column) AlfaZeta Mechanical Display
#### Lang: TypeScript
#### Device: Raspberry Pi 4 
#### USB: USB to RS485 adapter | /dev/ttyS0 using the UART pins 
#### Display V+: 24v

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
Uses Open Meteo for weather data. 

##### Want to change the location?
just change the cords in the index file. 


#### Want to make it run forever?

use Systemd
https://www.google.com/search?q=set+systemd+to+run+script+once+an+hour&sca_esv=ea1a1df108c957c8&ei=8o8BZ7reAdWsiLMP_Obg2QY&ved=0ahUKEwi6n7u1-feIAxVVFmIAHXwzOGsQ4dUDCA8&uact=5&oq=set+systemd+to+run+script+once+an+hour&gs_lp=Egxnd3Mtd2l6LXNlcnAiJnNldCBzeXN0ZW1kIHRvIHJ1biBzY3JpcHQgb25jZSBhbiBob3VyMgUQIRigATIFECEYqwJIqCBQkAJYsh9wBngBkAEAmAHIA6AB5haqAQowLjE1LjEuMS4xuAEDyAEA-AEBmAIYoAKwF8ICChAAGLADGNYEGEfCAgUQIRifBZgDAIgGAZAGCJIHCjYuMTUuMS4xLjGgB_SOAQ&sclient=gws-wiz-serp
https://unix.stackexchange.com/questions/704109/configure-systemd-timer-to-run-every-hour-after-first-run



##### Credits

Character hex from https://github.com/owenmcateer/FlipDigits/blob/main/FlipDigits/config.pde#L39
Instagram: @motus_art

Protocol info from  https://github.com/ndsh/flipdigits
Instagram: @julian_hespenheide


######
https://jason19970210.medium.com/raspberry-pi-4-with-multiple-uart-interface-4eac75f74d7c

| TXD    PIN  |  RXD      PIN  |  Communication Port
uart0 :  GPIO 14    8  |  GPIO 15   10  |  /dev/ttyAMA0 
uart1 :  GPIO 0    27  |  GPIO 1    28  |  /dev/ttyAMA1
uart2 :  GPIO 4     7  |  GPIO 5    29  |  /dev/ttyAMA2
uart3 :  GPIO 8    24  |  GPIO 9    21  |  /dev/ttyAMA3
uart4 :  GPIO 12   32  |  GPIO 13   33  |  /dev/ttyAMA4
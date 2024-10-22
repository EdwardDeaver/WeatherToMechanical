# Weather To Mechanical
#### Takes weather data and puts it on my 7x4 (Row x Column) AlfaZeta Mechanical Display
#### Lang: JavaScript and Python
#### Device: Raspberry Pi 4 
#### USB: USB to RS485 adapter | /dev/ttyS0 using the UART pins 
#### Display V+: 24v


Run serialserver:

Created because you can't have multiple devices trying to open the port. 

127.0.0.1:5000/ws 

Send the array of byte values as string x,y,z

* set the usb port and baud rate in the env



#### INSTALL 

run https://docs.astral.sh/uv/getting-started/installation/

in the highlowscene run 
```
npm i
```

then: 

```
cd ..


cp SerialServer/enable_local_ws.service /etc/systemd/system/
cp highLowScene/enable_high_low_scene.service /etc/systemd/system/

sudo systemctl enable enable_local_ws
sudo systemctl enable enable_high_low_scene

```



##### Credits

Character hex from https://github.com/owenmcateer/FlipDigits/blob/main/FlipDigits/config.pde#L39
Instagram: @motus_art

Protocol info from  https://github.com/ndsh/flipdigits
Instagram: @julian_hespenheide

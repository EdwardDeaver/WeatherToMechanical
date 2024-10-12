import { SerialPort } from 'serialport';
import WebSocket from 'ws';
import { textTransforms } from "./text_transforms.js"; 



// Create a port
export class writeToDevice{
    address = 0;
    usbdevicePort = "";
    serialWritingPort; 
    url = '';

    websocketClient;
    
    constructor(url){
         console.log("HI");
          /*
          if(usbdevicePort && baudrate){
        this.usbdevicePort = usbdevicePort;

        this.serialWritingPort = new SerialPort({
            path: usbdevicePort,
            baudRate: baudrate,
          })

          // Open errors will be emitted as an error event
            this.serialWritingPort.on('error', function(err) {
                console.log('Error: ', err)
            })
          }
            */
        if(url){
          this.url = url;
        }

        if(url){
         this.websocketClient =  new WebSocket(url);
        }
    }
    // From: https://github.com/ndsh/flipdigits
    // Header	command	Address	Data	End byte
    // 0x80	Description below	0x00 - 0xFF*	Description below	0x8F
    //// Command	Number of data bytes	Automatic refresh	Description
    // 0x89	1	Yes	Send one data byte and show it on the display
    // 0x8A	1	No	Send one data byte and wait for refresh
    // 0x8B	1	-	Set RS speed: 0x00 – 1200bit/s 0x01 – 2400bit/s 0x02 – 4800bit/s 0x03 – 9600bit/s 0x04 – 19200bit/s 0x05 – 38400bit/s 0x06 – 57600bit/s 0x07 – 115200bit/s
    // 0x8C	1	-	Set address: 0x00 – 0xFE (0xFF broadcast)
    // 0xC0	0	-	Format 0x80, 0xC0, 0x8F – request for address, response – 0xAA, 0xCC, [address]

    messageWrite(command, address, data){
      var buffer = new Buffer.alloc(32);
      buffer[0] = 0x80;
      buffer[1] = command;
      buffer[2] = address;

          for (let i =0; i<data.length;i++){
            buffer[i+3] = data[i];
          }
          console.log(data)
          console.log(data.length);

          buffer[31] = 0x8F;
          this.serialWritingPort.write(buffer, function(err) {

            if (err) {
              return console.log('Error on write: ', err.message)
            }
            console.log('message written')
          })   
    }

    networkWrite(command, address, data){
 
      const myTransform = new textTransforms();
      let header = [0x80,command, address]

      var d = header.concat(data, [0x8f]);
      console.log("HI")
      console.log(d)
      console.log(this.websocketClient);
      console.log('test');
      this.websocketClient.on('open', function open() {
        websocketClient.send(d);
      });
       
    }




}

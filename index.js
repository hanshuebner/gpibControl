const express = require('express');
const SerialPort = require('serialport');
const app = express();
const port = 3001;

const serialport = new SerialPort('COM10');
const Readline = SerialPort.parsers.Readline
const parser = serialport.pipe(new Readline({delimiter: '\r'}));

let status = false;

app.get('/', (req, res) => {
  status = !status;
  const message = 'DIG1 ' + (status ? '1' : '0');
  parser.once('data', response => {
    res.send('Response: ' + JSON.stringify(response));
    console.log(message, '=>', response);
  });
  serialport.write(message + '\r');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
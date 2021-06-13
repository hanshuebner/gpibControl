const express = require('express');
const SerialPort = require('serialport');
const app = express();
const port = 4000;

const serialport = new SerialPort('COM10');
const Readline = SerialPort.parsers.Readline
const parser = serialport.pipe(new Readline({delimiter: '\r'}));

app.use(express.json());
app.use(express.static('client/build'))

app.post('/api/send', (req, res) => {
  const { message } = req.body;
  const timeout = setTimeout(() => {
    parser.removeAllListeners();
    res.status(500).send('timeout reading response');
  }, 1000);
  parser.once('data', response => {
    clearTimeout(timeout);
    console.log('got response', response);
    res.send({ response });
  });
  console.log('sending message', message);
  serialport.write(message + '\r');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
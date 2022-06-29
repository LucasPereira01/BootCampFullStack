const express = require('express');
const app = express();
const port = 3000;

app.get('/helo', (req, res) => {
  res.send('Helo,Wordooo');
});

app.listen(port, () => console.log('Rondandossss'));

const rightPath = `${__dirname}\\public`,
      http      = require('http');
// NPM packages
const express = require('express'),
      app     = express();


const port  =  process.env.PORT || 4000;
const server = http.createServer(app);
app.use(express.static(rightPath));
app.listen(port, () => console.log(`listening on port ${port}`));
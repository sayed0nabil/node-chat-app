const rightPath = `${__dirname}\\public`;

// NPM packages
const express = require('express'),
      app     = express();


const port = 4000 || process.env.PORT;
app.use(express.static(rightPath));
app.get('/', (req, res) => {
    res.sendFile('index.html');
})
app.listen(port, () => console.log(`Listening on port ${port}`))
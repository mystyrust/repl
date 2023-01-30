const express = require('express');
const fs = require("fs");
const { createCanvas } = require("canvas");

const app = express();

const ficUrl = "https://archiveofourown.org/works/27314074/chapters/87215485"

app.set('trust proxy', true)

app.use(function getOrInitId(req, res, next) {
  const ip = req.ip;
  const time = timestamps[ip];
  const now = new Date(Date.now());

  if (!histories[ip] || (time && Math.abs(now.getDate() - time.getDate()) >= 2)) {
    histories[ip] = []; // clear histories after 2 days , or user is visiting for the first time
    timestamps[ip] = new Date(Date.now());
  }
  next();
})

var histories = {}; // key = ip address (used to be cookie id) , value = array of loops visited
var timestamps = {} // key = ip address, value = timestamp 
const loops = ["ask-sam", "ask-jazz", "ask-tucker", "ask-elle", "ask-none"]

app.get("/images/:visited/visited.png", (req, res) => {
  const filePath = "./images/red-x.png"
  const visited = req.params.visited;
  const ip = req.ip;

  // https://www.geeksforgeeks.org/how-to-fetch-images-from-node-server/

  fs.exists(filePath, function(exists) {
    // Setting default Content-Type
    var contentType = "image/png";
    res.writeHead(200, {
      "Content-Type": contentType
    });

    if (histories[ip].includes(visited)) {
      // Reading the file
      fs.readFile(filePath, function(err, content) {
        res.end(content);
      });
    } else {
      var canvas = createCanvas(1, 1, "png");
      var buf = canvas.toBuffer();
      res.end(buf);
    }
  });
})

app.get('/next/:visited', (req, res) => {
  const visited = req.params.visited;
  const ip = req.ip;

  if (!histories[ip].includes(visited)) {
    histories[ip].push(visited);
  }

  let allFounded = loops.every(l => histories[ip].includes(l));

  // handle redirect here
  if (allFounded) {
    // res.send(`visited all routes`)
    res.redirect(ficUrl + "#start2")
  } else {
    // res.send(`havent visited all routes yet! you just visited [${visited}] rn`)
    res.redirect(ficUrl + "#start")
  }
});

app.get('/clear', (req, res) => {
  const ip = req.ip;

  histories[ip] = [];
  timestamps[ip] = new Date(Date.now());
  res.redirect(ficUrl + "#root")
})

app.get('/', (req, res) => {
  res.send('yo do we got a hacker here or what')
});

app.get('/:file', (request, response) => {
  var file = request.params.file;
  response.sendFile(`./html/${file}`, { root: '.' });
});

app.get('/:folder/:file', (request, response) => {
  var file = request.params.file;
  var folder = request.params.folder
  response.sendFile(`./${folder}/${file}`, { root: '.' });
});

app.listen(3000, () => {
  console.log('server started');
});
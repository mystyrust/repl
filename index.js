const express = require('express');
const fs = require("fs");
const { createCanvas } = require ("canvas");

const app = express();
const ficUrl = "https://archiveofourown.org/works/27314074/chapters/87215485"

app.use(require('cookie-parser')());

app.use(function getOrInitId(req, res, next) {
    var id = req.cookies.id;
    if(id === undefined || !(id in histories)) {
        id = Math.random();
        res.cookie("id", id, { maxAge: 90000000, sameSite: "None", secure: true });
        histories[id] = [];
    }
    req.id = id;
    next();
})

var histories = {};
const loops = ["ask-sam", "ask-jazz", "ask-tucker", "ask-elle", "ask-none"]

app.get("/images/:visited/visited.png", (req, res) => {
  const filePath = "./images/red-x.png"
  const visited = req.params.visited;
  // https://www.geeksforgeeks.org/how-to-fetch-images-from-node-server/

  fs.exists(filePath, function (exists) {
        // Setting default Content-Type
    var contentType = "image/png";
    res.writeHead(200, { 
            "Content-Type": contentType });

    if (histories[req.id].includes(visited))
    {
      // Reading the file
      fs.readFile(filePath,function (err, content) {
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

    if (!histories[req.id].includes(visited))
    {
      histories[req.id].push(visited);
    }
    
   let allFounded = loops.every(l => histories[req.id].includes(l) );

  // handle redirect here
   if (allFounded) {
    res.redirect(ficUrl + "#start2")
     // res.send(`visited all routes`)
   } else {
     // res.send(`havent visited all routes yet! you just visited [${visited}] rn`)
     res.redirect(ficUrl + "#start")
   }
});

app.get('/clear', (req, res) => {
  histories[req.id].splice(0, histories[req.id].length)
  res.redirect(ficUrl + "#root")
})

app.get('/', (req, res) => {
  res.send('yo do we got a hacker here or what')
});

app.get('/:file', (request, response)=> {
    var file = request.params.file;
    response.sendFile(`./html/${file}`, { root: '.' });
});

app.get('/:folder/:file', (request, response)=> {
    var file = request.params.file;
    var folder = request.params.folder
    response.sendFile(`./${folder}/${file}`, { root: '.' });
});

app.listen(3000, () => {
  console.log('server started');
});
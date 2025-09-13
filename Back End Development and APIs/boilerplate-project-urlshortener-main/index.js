require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dns = require("dns");
const urlParser = require("url");
const { error } = require('console');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urls = [];
let id = 1;

app.post("/api/shorturl", (req, res) => {
  const original_url = req.body.url;
  const hostname = urlParser.parse(original_url).hostname;

  if (!hostname) {
    return res.status(404).json({
      error: "invalid url"
    });
  }

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.status(404).json({ error: "invalid url" });
    }

    urls.push({ original_url, short_url: id });
    res.json({ original_url, short_url: id });
    id++;
  });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const short_url = parseInt(req.params.short_url);
  const entry = urls.find((u) => u.short_url === short_url);

  if (!entry) {
    return res.status(404).json({ error: "No short URL found" });
  }

  res.redirect(entry.original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

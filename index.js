const express = require('express');
const app = express();
const enforce = require('express-sslify');
const port = process.env.port || 8080;

app.use(enforce.HTTPS({ trustProtoHeader: true }))

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: 'false',
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(__dirname + '/public')); // set the static files location

app.get('/', function(req, res) {
  res.redirect('/playlists');
});

app.get('/playlists', function(req, res) {
  res.sendFile('playlists.html', {
    root: 'public/'
  });
});

app.listen(port);

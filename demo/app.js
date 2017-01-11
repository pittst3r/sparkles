var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('assets'));

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, function() {
  console.log('');
  console.log('•-----------------------•');
  console.log('| http://localhost:3000 |');
  console.log('•-----------------------•');
});

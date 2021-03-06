var express = require('express')
  , app = express(),
  routes = require('./routes/index');

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use('/', routes);

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})

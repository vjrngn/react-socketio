var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
    

const PORT = process.env.PORT || 3000;
server.listen(PORT);

app.use(express.static(__dirname + "/public"))
app.get('/', function(req, res) {
  res.sendFile(__dirname + 'index.html')
})

io.on('connection', function(socket) {
  console.log('connected');

  socket.on('message', function(message) {
    console.log(message);
    io.emit('message', message);
  })
})

console.log('listening on localhost:' + PORT);
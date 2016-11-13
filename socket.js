var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);


  
    

const PORT = process.env.PORT || 3000;
server.listen(PORT);

const user = { id: 1, name: 'Vijay Rangan' },
      anand = { id:2, name: 'Anand' },
      vignesh = { id:3, name: 'Vignesh' };

var chatList = [
    {
      room_id: 1, 
      friend: anand, 
      messageList: [{
        body: 'Hey',
        room_id: 1
      }, 
      {
        body: 'Hey Back',
        room_id: 1
      }]
    },
    {
      room_id: 2, 
      friend: vignesh, 
      messageList: [{
        body: 'Hey Vijay',
        room_id: 2
      }, 
      {
        body: 'Hey Piggy',
        room_id: 2
      }]
    }
  ];

var updateChatList = function (roomId, message) {
  // var chat = chatList.find(function (chat) { return chat.room_id == roomId });
  // chat.messageList.push(message);
  console.log(chat);
};

app.use(express.static(__dirname + "/public"))
app.get('/', function(req, res) {
  res.sendFile(__dirname + 'index.html')
})
app.get('/chatList', function(req, res) {
  return res.json(chatList);
})

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('message', function(message) {
    console.log(message);
    io.emit('message', { body: 'Remote receieved: ' + message.body, room_id: message.room_id });
  })
})

console.log('listening on localhost:' + PORT);
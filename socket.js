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
      id: 1, 
      friend: anand, 
      messageList: [{
        body: 'Hey',
        chat_id: 1
      }, 
      {
        body: 'Hey Back',
        chat_id: 1
      }],
    },
    {
      id: 2, 
      friend: vignesh, 
      messageList: [{
        body: 'Hey Vijay',
        chat_id: 2
      }, 
      {
        body: 'Hey Piggy',
        chat_id: 2
      }],
    }
  ];

var updateChatList = function (chatId, message) {
  var chat = chatList.find(function (chat) { return chat.id == chatId });
  chat.messageList.push(message);
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
    updateChatList(message.chat_id, message);
    io.emit('message', message);
  })
})

console.log('listening on localhost:' + PORT);
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);


  
    

const PORT = process.env.PORT || 3000;
server.listen(PORT);

const user = { id: 1, name: 'Vijay Rangan' },
      anand = { id:2, name: 'Anand' },
      vignesh = { id:3, name: 'Vignesh' };

/**
 * In-memory store of messages. This can be a memcached data store or something from mongo.
 * @type {Array}
 */
var chatList = [
    {
      room_id: 1, 
      friend: anand, 
      messageList: [{
        body: 'Hey',
        room_id: 1,
        friend: anand
      }, 
      {
        body: 'Hey Back',
        room_id: 1,
        friend: user
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

/**
 * Update chat messages.
 * @param  {Number} roomId  The room in which the message was posted.
 * @param  {Object} message Contents of the message posted.
 */
var updateChatList = function (roomId, message) {
  var chat = chatList.find(function (chat) { return chat.room_id == roomId });
  chat.messageList.push(message);
  console.log(chat);
};

/**
 * Setup application routes
 */
app.use(express.static(__dirname + "/public"))
app.get('/', function(req, res) {
  res.sendFile(__dirname + 'index.html')
})
app.get('/chatList', function(req, res) {
  return res.json(chatList);
})

io.on('connection', function(socket) {
  socket.on('message', function(message) {
    var echoResponse = { body: 'Remote receieved: ' + message.body, room_id: message.room_id, friend: { id: 4, name: 'Echo Bot' } };
    updateChatList(message.room_id, message);
    updateChatList(message.room_id, echoResponse)
    io.emit('message', echoResponse);
  })
})

console.log('listening on localhost:' + PORT);
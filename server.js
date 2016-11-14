var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

var me = { id: 1, name: 'Me' },
      andy = { id:2, name: 'Andy' },
      kaila = { id:3, name: 'Kaila' },
      john = { id:4, name: 'John' },
      kerry = { id:5, name: 'Kerry' },
      jane = { id:6, name: 'Jane' };

/**
 * In-memory store of messages. This can be a memcached data store or from a database.
 * @type {Array}
 */
var chatList = [
    {
      room_id: 1, 
      friend: andy, 
      messageList: []
    },
    {
      room_id: 2, 
      friend: kaila, 
      messageList: []
    },
    {
      room_id: 3, 
      friend: john, 
      messageList: []
    },
    {
      room_id: 4, 
      friend: kerry, 
      messageList: []
    },
    {
      room_id: 5, 
      friend: jane, 
      messageList: []
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
    var echoResponse = { body: message.to.name + ' says ' + message.body, room_id: message.room_id, friend: message.to };
    updateChatList(message.room_id, message);
    updateChatList(message.room_id, echoResponse)
    io.emit('reply', echoResponse);
  })
})


var isProduction = process.env.NODE_ENV === 'production';
var PORT = isProduction ? process.env.PORT : 3000;
server.listen(PORT, function () {
  console.log('listening on localhost:' + PORT);
});
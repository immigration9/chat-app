const chatroomHandler = require('./ChatroomHandler');
const userHandler = require('./UserHandler');

const ChatroomHandler = chatroomHandler();
const UserHandler = userHandler();

module.exports = function (socket) {

  socket.on('register', (username, callback) => {
    UserHandler.addUser(username, socket);
    callback();
  })

  socket.on('create', (chatroomName, callback) => {
    const newChatroom = ChatroomHandler.addChatroom(chatroomName);
    callback(newChatroom);
  });

  socket.on('chatroomList', (callback) => {
    const chatroomList = ChatroomHandler.getChatroomList();
    
    callback(chatroomList.map((chatroom) => {
      return chatroom.getChatroomInfo();
    }))
  })

  socket.on('participantList', (chatroomId, callback) => {
    const chatroom = ChatroomHandler.findChatroom(chatroomId);
    
    if (chatroom) {
      const participantList = chatroom.getUserList();
      callback(participantList);      
    }
  })

  socket.on('join', (chatroomId, username, callback) => {
    const chatroom = ChatroomHandler.findChatroom(chatroomId);
    const user = UserHandler.findUserByName(username);

    if (chatroom && user) {
      const newUser = chatroom.addUser(user);
      callback(newUser);
    }
  });

  socket.on('leave', (chatroomId, username, callback) => {
    const chatroom = ChatroomHandler.findChatroom(chatroomId);
    const user = UserHandler.findUserByName(username);
    
    if (chatroom && user) {
      chatroom.removeUser(username);
      callback();
    }
  });

  socket.on('message', (chatroomId, username, message, callback) => {
    const chatroom = ChatroomHandler.findChatroom(chatroomId);
    const user = UserHandler.findUserByName(username);
    
    if (chatroom && user) {
      const newMessage = chatroom.addMessage(message, user.name);
      chatroom.broadcastMessage(newMessage);
      callback();
    }
  });

  socket.on('invite', (chatroomId, username, callback) => {
    const chatroom = ChatroomHandler.findChatroom(chatroomId);
    const user = UserHandler.findUserByName(username);

    if (chatroom && user) {
      const newUser = chatroom.addUser(user);
      const newMessage = chatroom.addMessage(`${username}이 초대되었습니다`, username);
      chatroom.broadcastMessage(newMessage);
      user.client.emit('invited', username, chatroomId);
    }
    callback();
  })

  socket.on('disconnect', (username) => {
    const chatrooms = ChatroomHandler.getChatroomList();
    const user = UserHandler.findUserByName(username);

    if (chatrooms) {
      chatrooms.map((chatroom) => {
        chatroom.removeUser(username);
      })
    }
    if (user) {
      UserHandler.removeUser(username);
    }
  })
}
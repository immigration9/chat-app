module.exports = (socket) => {

  socket.on('register', handleRegister);

  socket.on('join', handleJoinRoom);

  socket.on('leave', handleLeaveRoom);

  socket.on('message', handleMessage);
}
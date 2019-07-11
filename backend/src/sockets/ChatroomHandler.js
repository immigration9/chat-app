const Chatroom = require('./Chatroom');

const defaultChatrooms = [
  {
    chatroom: 'Tutorials',
    chatroomId: 1000,
  },
  {
    chatroom: 'Talk about Javascript',
    chatroomId: 1001,
  },
]

module.exports = function () {
  let chatroomId = 100;
  let chatrooms = [];

  /**
   * Default Chatroom Insert
   */
  defaultChatrooms.map((dc) => {
    chatrooms = chatrooms.concat(Chatroom(dc.chatroomId, dc.chatroom));
  })

  function addChatroom(chatroomName) {
    const newChatroom = Chatroom(chatroomId, chatroomName)
    chatrooms = chatrooms.concat(newChatroom)
    chatroomId += 1;
    return newChatroom.getChatroomInfo();
  }

  function removeChatroom(chatroomId) {
    const exists = findChatroom(chatroomId);
    if (exists) {
      const idx = chatrooms.map((chatroom) => chatroom.getChatroomInfo().id).indexOf(chatroomId);
      chatrooms.splice(idx, 1);
    }
  }

  function findChatroom(chatroomId) {
    return chatrooms.find((chatroom) => {
      const chatroomInfo = chatroom.getChatroomInfo();
      return chatroomInfo.id === chatroomId;
    });
  }

  function findChatroomByName(chatroomName) {
    return chatrooms.find((chatroom) => {
      const chatroomInfo = chatroom.getChatroomInfo();
      return chatroomInfo.name === chatroomName;
    });
  }

  function getChatroomList() {
    return chatrooms;
  }

  return {
    addChatroom,
    removeChatroom,
    getChatroomList,
    findChatroom,
    findChatroomByName,
  }
}
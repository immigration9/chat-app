

module.exports = function (id, name) {
  /**
   * member = { id, name, user }
   * message = { id, message, userId }
   */
  let members = [];
  let records = [];
  let messageId = 0;
  let chatroomId = id;
  let chatroomName = name;

  function broadcastMessage(message) {
    members.map(({ client }) => {
      client.emit('message', message);
    })
  }

  function addMessage(message, userName) {
    const newMessage = {
      id: messageId,
      message: message,
      name: userName
    }
    messageId += 1;
    records = records.concat(newMessage);

    return newMessage;
  }

  function addUser(user) {
    const exists = findUserByName(user.name);
    if (!exists) {
      members = members.concat(user)
      // return newUser;
    }
    // return exists
  }

  function removeUser(userName) {
    const exists = findUserByName(userName);
    if (exists) {
      const idx = members.map((member) => member.name).indexOf(userName);
      members.splice(idx, 1);
    }
  }

  function getRecords() {
    return records;
  }

  function getChatroomInfo() {
    return {
      id: chatroomId,
      name: chatroomName
    };
  }

  function getUserList() {
    return members;
  }

  function findUserByName(name) {
    return members.find((member) => {
      return member.name === name;
    });
  }

  return {
    broadcastMessage,
    addMessage,
    addUser,
    findUserByName,
    removeUser,
    getRecords,
    getChatroomInfo,
    getUserList,
  }

}
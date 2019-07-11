module.exports = function () {
  /**
   * user: { id, name, client }
   */
  let users = [];

  function addUser(name, socket) {
    const newUser = {
      name: name,
      client: socket
    }
    users = users.concat(newUser);
  }

  function removeUser(name) {
    const exists = findUserByName(name);
    if (exists) {
      const idx = users.map((user) => user.name).indexOf(name);
      users.splice(idx, 1);
    }
  }

  function findUserByName(name) {
    return users.find((user) => user.name === name);
  }

  function getUsersList() {
    return users;
  }

  return {
    addUser,
    removeUser,
    findUserByName,
    getUsersList
  }
}
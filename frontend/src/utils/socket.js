import io from 'socket.io-client';

const singleton = Symbol('singleton');

class SocketHandler {
  constructor() {
    let Class = this.constructor;

    if (!Class[singleton]) {
      Class[singleton] = this;
    }

    this.connect();

    return Class[singleton];
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new this;
    }

    return this[singleton];
  }

  connect = () => {
    if (!this.client) {
      this.client = io.connect('http://localhost:8080');
    }
  }

  join = (chatroomId, callback) => { 
    this.client.emit('register', chatroomId, callback); 
  }

  leave = (chatroomId, callback) => { 
    this.client.emit('leave', chatroomId, callback); 
  }

  message = (chatroomId, message, callback) => { 
    this.client.emit('message', chatroomId, message, callback)
  }

}

export default SocketHandler;
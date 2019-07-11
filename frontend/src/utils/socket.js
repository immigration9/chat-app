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

  /**
   * 방을 생성함
   */
  create = (chatroomName, callback) => {
    /**
     * Callback으로 Chatroom의 Name과 ID를 리턴 받아야함
     */
    this.client.emit('create', chatroomName, callback) ;
  }

  register = (username, callback) => {
    this.client.emit('register', username, callback);
  }

  /**
   * 방에 접속함
   */
  join = (chatroomId, username, callback) => { 
    this.client.emit('join', chatroomId, username, callback); 
  }

  /**
   * 방에서 나감
   */
  leave = (chatroomId, username, callback) => { 
    this.client.emit('leave', chatroomId, username, callback); 
  }

  /**
   * 방에 초대됨
   */
  invite = (chatroomId, otherUserName, callback) => {
    this.client.emit('invite', chatroomId, otherUserName, callback);
  }

  /**
   * 메시지를 전송함
   */
  message = (chatroomId, username, message, callback) => { 
    this.client.emit('message', chatroomId, username, message, callback)
  }

  listen = (callback) => {
    console.log("llll", callback)
    this.client.on('message', callback);
  }

  invitation = (callback) => {
    this.client.on('invited', callback)
  }

  getChatroomList = (callback) => {
    this.client.emit('chatroomList', callback);
  }

}

export default SocketHandler;
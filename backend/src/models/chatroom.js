const Joi = require('@hapi/joi');
const mongoose, { Schema, SchemaTypes} = require('mongoose');

const chatroomSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  adminId: {
    type: SchemaTypes.ObjectId,
    required: true,
    minlength: 5,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  }
})

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

function chatroomValidator(chatroom) {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    adminId: Joi.string().min(5).required(),
  }
  return Joi.validate(chatroom, schema);
}

module.exports = {
  Chatroom: Chatroom,
  validate: chatroomValidator
};
const Joi = require('@hapi/joi');
const mongoose, { Schema, SchemaTypes} = require('mongoose');

const ENUM_TEXT = 'text';
const ENUM_IMAGE = 'image';

const messageSchema = new Schema({
  chatroomId: {
    type: SchemaTypes.ObjectId,
    required: true,
    minlength: 5,
  },
  type: {
    type: String,
    enum: [ ENUM_TEXT, ENUM_IMAGE ],
    lowercase: true,
    trim: true,
    required: true
  },
  content: {
    type: String,
    minlength: 1,
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
    default: Date.now
  },  
})

const Message = mongoose.model('Message', messageSchema);

function messageValidator(message) {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    type: Joi.string().valid([ENUM_TEXT, ENUM_IMAGE]).required(),
    content: Joi.string().min(1).required(),
  }
  return Joi.validate(message, schema);
}

module.exports = {
  Message: Message,
  validate: messageValidator
};
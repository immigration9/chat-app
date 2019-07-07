const Joi = require('@hapi/joi');
const mongoose, { Schema, SchemaTypes} = require('mongoose');

const participantSchema = new Schema({
  chatroomId: {
    type: SchemaTypes.ObjectId,
    required: true,
    minlength: 5,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    minlength: 5,
  },
  isMember: {
    type: Boolean,
    required: true,
    default: true,
  },
  joined_at: {
    type: Date,
    required: true,
    default: Date.now
  },
})

const Participant = mongoose.model('Participant', participantSchema);

function participantValidator(participant) {
  const schema = {
    chatroomId: Joi.string().min(5).required(),
    userId: Joi.string().min(5).required(),
  }
  return Joi.validate(participant, schema);
}

module.exports = {
  Participant: Participant,
  validate: participantValidator
};
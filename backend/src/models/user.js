const config = require('config');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1023,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
})

userSchema.methods.getAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwt.key'));
  return token;
}

const User = mongoose.model('User', userSchema);

function userValidator(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1023).required()
  }
  return Joi.validate(user, schema);
}

module.exports = {
  User: User,
  validate: userValidator
};
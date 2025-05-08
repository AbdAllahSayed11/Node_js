const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
    trim: true,
    minLength :[8, 'Username must be at least 8 characters'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minLength:[3, 'First name must be at least 3 characters'],
    maxnLength :[15, 'First name must be at most 15 characters'],
  },
  lastName :{
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minLength:[3, 'First name must be at least 3 characters'],
    maxnLength :[15, 'First name must be at most 15 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  dob:{
    type : Date,
    default: Date.now,
  },

  img:{
    type:String,
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  curentToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export default model('user', userSchema);

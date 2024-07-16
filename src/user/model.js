import mongoose ,{Schema} from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  memberid: {
    type: Number,
    default: null,
  },
  user_code: {
    type: Number,
    default: null,
  },
  files: {
    type: String,
    default: null,
  },
  image_attached: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', userSchema)

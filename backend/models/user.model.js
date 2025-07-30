import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://placehold.co/150x150/cccccc/333333?text=Avatar', // Placeholder avatar
  },
  }, { timestamps: true });  // Automatically manage createdAt and updatedAt fields

const User = mongoose.model('User', UserSchema);

export default User;

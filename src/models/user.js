import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  account: {
    google: {
      email: {
        type: String,
      },
    },
    facebook: {
      email: {
        type: String,
      },
    },
  },
}, {
  timestamps: true,
  /*
  Create a custom object virtually for
  displaying the data to the client
  */
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      return {
        id: ret._id,
        name: ret.name,
        account: ret.account,
      };
    },
  },
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { sub: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
  );
};

const User = mongoose.model('user', userSchema);

export default User;

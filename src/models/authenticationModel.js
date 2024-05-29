const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const authenticationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    authToken: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

authenticationSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({_id: this.id.toString()},process.env.JWT_SECRET_KEY);
    this.authToken = this.authToken.concat({ token });

    await this.save();
    return token;
    
  } catch (error) {
    console.log(error);
  }
};
const AuthUser = mongoose.model("AuthUser", authenticationSchema);

module.exports = AuthUser;

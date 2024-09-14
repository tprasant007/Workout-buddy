const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// statics signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be 8 characters long and include a mix of uppercase, lowercase, numbers, and symbols."
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// statics login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User with email doesn't exist");
  }

  const checkPassword = await bcryptjs.compare(password, user.password);

  if (!checkPassword) {
    throw Error("Password do not match");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-as-promised");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    uppercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  type: {
    type: String,
    upercase: true,
    enum: ["ADMIN", "USER"]
  }
});

userSchema.methods = {
  async authenticate(textPassword) {
    try {
      return await bcrypt.compare(textPassword, this.password);
    } catch (err) {
      return false;
    }
  },
  encryptPassword(password) {
    return bcrypt.hash(password, 8);
  }
};

module.exports = mongoose.model("User", userSchema);

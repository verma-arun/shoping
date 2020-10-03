const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, user) {
    delete user.id;
    delete user._id;
    delete user.password;
  },
});

module.exports = mongoose.model("User", UserSchema);

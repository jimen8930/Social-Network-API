const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// A virtual property for the friend count and a getter for the virtual that will return the length of thr friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Initialize the user model
const User = model("user", userSchema);
// Exports
module.exports = User;

const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  name: String,
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userShema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", userShema);

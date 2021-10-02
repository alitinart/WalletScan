const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
  firstName: { type: String, required: "This field is required" },
  lastName: { type: String, required: "This field is required" },
  userName: { type: String, required: "This field is required" },
  password: { type: String, required: "This field is required" },
  balance: { type: String, required: "This field is required" },
  imgPath: { type: String, required: "This field is required" },
  transactions: { type: Array },
});

mongoose.model("Profile", Profile);

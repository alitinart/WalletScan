const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
  value: { type: String, required: "This field is required" },
  sender: { type: String, required: "This field is required" },
  senderProfile: { type: String, required: "This field is required" },
  userId: { type: String, required: "This field is required" },
});

mongoose.model("Transaction", Transaction);

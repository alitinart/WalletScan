const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
  value: { type: String, required: "This field is required" },
  sender: { type: String, required: "This field is required" },
  senderProfile: { type: String, required: "This field is required" },
  accepted: {
    type: Boolean,
    default: false,
    required: "This field is required",
  },
});

mongoose.model("Payment", Payment);

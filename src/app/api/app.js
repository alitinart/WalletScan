const app = require("express")();
const database = require("./database/db");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");
const Payment = mongoose.model("Payment");
const Transaction = mongoose.model("Transaction");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
  next();
});

app.get("/users", (req, res) => {
  Profile.find({}).then((lists) => {
    res.send(lists);
  });
});

app.post("/users", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let userName = req.body.userName;
  let password = req.body.password;
  let balance = req.body.balance;
  // let balance = 1000000;
  let imgPath = req.body.imgPath;

  let newProfile = new Profile({
    firstName,
    lastName,
    userName,
    password,
    balance,
    imgPath,
  });
  newProfile.save().then((profileDoc) => {
    res.send(profileDoc);
  });
});

app.delete("/users/:id", (req, res) => {
  Profile.findOneAndRemove({ _id: req.params.id }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.delete("/payments/:id", (req, res) => {
  Payment.findOneAndRemove({ _id: req.params.id }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.get("/users/:userName", (req, res) => {
  Profile.findOne({ userName: req.params.userName }).then(
    (logInUserDetails) => {
      res.send(logInUserDetails);
    }
  );
});

app.post("/payments/", (req, res) => {
  let value = req.body.value;
  let sender = req.body.sender;
  let senderProfile = req.body.senderProfile;
  let accepted = req.body.accepted;

  let newPayment = new Payment({
    value,
    sender,
    senderProfile,
    accepted,
  });
  newPayment.save().then((paymentDoc) => {
    res.send(paymentDoc);
  });
});

app.get("/payments/", (req, res) => {
  Payment.find({}).then((payments) => {
    res.send(payments);
  });
});

app.get("/payments/:id", (req, res) => {
  Payment.find({ _id: req.params.id }).then((payment) => {
    res.send(payment);
  });
});

app.get("/users/:id", (req, res) => {
  Profile.find({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

app.patch("/payments/:id", (req, res) => {
  Payment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    () => {
      res.send({ message: "Updated successfully" });
    }
  );
});

app.patch("/users/:id", (req, res) => {
  Profile.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
    () => {
      res.send({ message: "Updated successfully" });
    }
  );
});

app.post("/users/:userId/transactions/", (req, res) => {
  let value = req.body.value;
  let sender = req.body.sender;
  let senderProfile = req.body.senderProfile;
  let userId = req.body.userId;

  let newTransaction = new Transaction({
    value,
    sender,
    senderProfile,
    userId,
  });
  newTransaction.save().then((transactionDoc) => {
    res.send(transactionDoc);
  });
});

app.get("/users/:userId/transactions", (req, res) => {
  Transaction.find({}).then((transactions) => {
    res.send(transactions);
  });
});

app.listen(3000, "192.168.100.26", () => {
  console.log("Server is listening on port 3000");
});

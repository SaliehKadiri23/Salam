const mongoose = require("mongoose");
const Forum = require("../models/forum");

const dbUrl = "mongodb://127.0.0.1:27017/salam";
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connection Successful"))
  .catch((e) => console.log("error: ", e));

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error : ")
);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
});


// Forums

const forums = [
  {
    name: "New Muslims & Converts",
    icon: "Heart",
    description: "A welcoming space for those new to Islam",
    createdBy: "68b0adc5dae81c0cc8eafe30",
    admins: ["68b0adc5dae81c0cc8eafe30"],
    members: ["68b0adc5dae81c0cc8eafe30"],
    posts: [],
    createdDate: new Date(),
  },
  {
    name: "Parenting & Family",
    icon: "Stars",
    description: "Share advice on raising a Muslim family",
    createdBy: "68b0adc5dae81c0cc8eafe30",
    admins: ["68b0adc5dae81c0cc8eafe30"],
    members: ["68b0adc5dae81c0cc8eafe30"],
    posts: [],
    createdDate: new Date(),
  },
  {
    name: "Youth Corner",
    icon: "Star",
    description: "Discussions for the younger generation",
    createdBy: "68b0adc5dae81c0cc8eafe30",
    admins: ["68b0adc5dae81c0cc8eafe30"],
    members: ["68b0adc5dae81c0cc8eafe30"],
    posts: [],
    createdDate: new Date(),
  },
];

async function seedForums() {
  await Forum.deleteMany({}).then((res) => console.log(res));
  await Forum.insertMany(forums)
    .then((res) => console.log("Inserted Forums Successfully", res))
    .catch((e) => console.log("Error : ", e));
}

seedForums();

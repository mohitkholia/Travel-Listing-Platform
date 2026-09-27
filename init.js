const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const data = require("./data.js");

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tripNestt");
}

const initDB = async () => {
  await Listing.deleteMany({});

  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "6ab40f6037f082c0eb79eaf7",
  }));

  await Listing.insertMany(data.data);

  console.log("data was initialized");
};
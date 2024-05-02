const mongoose = require("mongoose");

const connection = async () => {
  const DB_URI = process.env.DATABASE_URI;

  try {
    const connect = mongoose.connect(DB_URI);

    if (connect) {
      console.log(`Database connect in URI: ${DB_URI}`);
    }
  } catch (err) {
    console.log(`Database connect error ${err}`);
  }
};

module.exports = connection;

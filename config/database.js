const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected: " + connection.connection.host + ":" + connection.connection.port + "/" + connection.connection.name);
  } catch (error) {
    console.error("MongoDB connection error: " + error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

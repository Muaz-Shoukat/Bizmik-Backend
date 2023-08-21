const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to un caught exception");
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server working on port http://localhost:${process.env.PORT}`);
});

// Unhandled Promist Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

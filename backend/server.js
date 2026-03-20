const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// connect to database first, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err.message);
  });
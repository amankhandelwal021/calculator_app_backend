const express = require("express");
const cors = require('cors');
const morgan = require("morgan");

const authenticationRoute = require("./src/routes/authenticationRoute")
const userRoute = require("./src/routes/userRoute")

const { connectDB } = require("./src/database/connection");
const auth = require("./src/middleware/middleware");
connectDB();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", authenticationRoute);
app.use("/api/v1", auth, userRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

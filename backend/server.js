require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dns = require("dns");
const app = express();


 console.log("Before:", dns.getServers()); dns.setServers(["8.8.8.8", "1.1.1.1"]); console.log("After:", dns.getServers()); dns.resolve4("google.com", (err, addresses) => { console.log(err, addresses); });
 
connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./configs/database");
const mongoose = require("mongoose");
const path = require("path");

// CONFIG .env
require("dotenv").config();

// Import Routers
const authRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");

// Connect to mongo DB
connectDB();

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Repo for Caro Online Web App");
});

// Route Middleware
app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);

//Page not found
app.use((req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

// if (process.env.NODE_ENV === "development") {
//   app.use(cors({ origin: process.env.CLIENT_URL }));
//   app.use(morgan("dev"));
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static('../client/user-front-end/build'));
  vapp.use(express.static('../client/admin-front-end/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/user-front-end', 'build', 'index.html')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/admin-front-end', 'build', 'index.html')));
}

// Run app
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server is running!");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Socket IO
const listUserOnline = require("./object/listUserOnline");

io.on("connection", (socket) => {
  socket.on("join", () => {
    //socket.join(boardId);
    io.emit("new_connect", listUserOnline.getAll());
  });

  socket.on("user_disconnect", (username) => {
    listUserOnline.remove(username);
    //socket.join(boardId);
    io.emit("new_connect", listUserOnline.getAll());
  });
});

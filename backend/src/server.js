const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
cors: {
origin: "http://localhost:3000",
},
});

// make io accessible globally
app.set("io", io);

// routes
const contractRoutes = require("./routes/contracts.routes");
app.use("/contracts", contractRoutes);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});

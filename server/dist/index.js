"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5143'
}));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log("Users connected: ", socket.id);
    socket.on('message', ({ roomId, message }) => {
        console.log(message);
        io.to(roomId).emit("message", message);
    });
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });
});
server.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});

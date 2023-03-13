const apiServer = require("./api");
const sockets = require("./sockets");
const httpServer = require("http").createServer(apiServer);
const socketServer = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
}); // necesita una instancia de un servidor http
const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log("Escuchando peticiones en puerto", PORT);
});

sockets.listen(socketServer);
let readyPlayerCount = 0;

function listen(io) {
    const tetrisNamespace = io.of("/tetris");
    const pongNamespace = io.of("/pong"); // crear un namespace
    // el namespace se puede usar para separar contextos de la aplicacion que usen sockets
    // por ejemplo modulos independientes donde se pueda usar sockets para partes especificas
    pongNamespace.on('connection', socket => { // recibe el cliente que se conectó al servidor socket
        let room;
        console.log("Connectted as ", socket.id);

        socket.on("ready", () => {

            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);
            readyPlayerCount++;

            console.log("Player ready", socket.id, room);

            if (readyPlayerCount % 2 === 0) {
                // iniciar el juego
                pongNamespace.in(room).emit("starGame", socket.id);
            }
        })

        socket.on("paddleMove", ({ xPosition }) => {
            socket.to(room).emit("paddleMove", { xPosition });
        });

        //ballMove

        socket.on("ballMove", ballData => {
            socket.to(room).emit("ballMove", ballData);
        })

        socket.on("disconnect", reason => { // escuchar el evento de desconectar el cliente
            console.log(`CLient ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        })
    })
}

module.exports = { listen };
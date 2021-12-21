"use strict";

const app = require('./app');
const debug = require('debug')(process.env.DEBUG);
const http = require('http');
require("./src/startups/database");
const { log: logger } = console;
const deliveryRespository = require("./src/app/deliveries/DeliveryRepository");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let socket = null;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error,port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


/**
 * Event listener for HTTP server "listening" event.
 */

const setupWebSocketio = async ()=>{
    socket = null;
    start();

}

exports.emit =( eventName, payload) =>{
    if (!socket) {
        // eslint-disable-next-line no-console
        console.error('Socket not connected. Please start socket connection');
    } else {
        socket.broadcast.emit(eventName, payload);
    }
}

const start = ()=> {
    logger('Gozem Socket Server started successfully.');
    io.on('connection', (sock) => {
        logger('Socket connected successfully');
        logger('Socket session with id', [sock.id], ' started a connection');
        socket = sock;
        app.use(function (req, res) {
            req.body.socketId=sock.id;
            logger("Req Body socket",req.body);
        });

        sock.on('location_changed', (payload) => {
            deliveryRespository.updateByDeliveryId(payload?.delivery_id,{location:payload?.location});
            console.log('message: ' + payload);
        });
        sock.on('status_changed', (payload) => {
            // {event, delivery_id, status}
            deliveryRespository.updateByDeliveryId(payload?.delivery_id,{status:payload?.status});
            console.log('message: ' + payload);
        });




    });
    io.on('disconnect', () => {
        logger('user disconnected');
    });
}
const setupExpress = async () => {


    try {
        /**
         * Get port from environment and store in Express.
         */

        const port = process.env.PORT ||normalizePort('8080');
        app.set('port', port);
        logger(" Server Starting up ON", port, 'Topic Subscription');
        /**
         * Listen on provided port, on all network implementations.
         */

        server.listen(port,function () {
            const { address, port } = this.address();
            const server = `http://${address === '::' ? '0.0.0.0' : address}:${port}`;
            logger('\n\nServer Started ON:', '\x1b[36m\x1b[89m', server);
            logger('Press Ctrl+C to quit.');
            // log('\n\n\x1b[1m\x1b[31m Server Started ON:', '\x1b[36m\x1b[89m\x1b[4m', server, '\x1b[0m');
            // log('\x1b[1m\x1b[31m', 'Press Ctrl+C to quit.\n\x1b[0m');
        })
        ;
        server.setTimeout(500000);
        server.on('error', (error) => {
            onError(error, port)
        });
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        });


    } catch (err) {
        logger("Erorr here");
        logger(err);
        debug(err);
        process.exit(1)
    }
};
setupExpress();
// start server
setupWebSocketio();

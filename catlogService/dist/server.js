"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
dotenv_1.default.config();
const debug = (0, debug_1.default)('imedicare-development:server');
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
const server = http_1.default.createServer(app_1.default);
async function startServer() {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}
;
startServer();
function normalizePort(val) {
    const port = parseInt(val, 10);
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
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr?.port}`;
    debug(`Listening on ${bind}`);
    console.log(`\x1b[44m\x1b[1m Listening on port    : \x1b[0m ${port}`);
    console.log(`\x1b[44m\x1b[1m Running environment  : \x1b[0m ${process.env.NODE_ENV}`);
}

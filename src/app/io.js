import socketIOClient from 'socket.io-client'

class IoConntector {
    constructor() {
        // this.connect = socketIOClient('http://localhost:3001');
    }

    getSocket() {
        if(this.connect) {
            return this.connect;
        } else {
            // this.connect = socketIOClient('http://localhost:3001');
        }
    }
}

export default new IoConntector();

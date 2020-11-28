const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        //Crear instancia de nuestro ticketlist
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado');

            //Solicitar ticket
            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback(nuevoTicket);
            });

            //Asignando siguiente ticket
            socket.on('siguiente-ticket', ({ agente, escritorio }, callback) => {
                
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                
                callback(suTicket);
            });

            this.io.emit('ticket-asignado', this.ticketList.ultimos13);
        
        });
    }
}


module.exports = Sockets;
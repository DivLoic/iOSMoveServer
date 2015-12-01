module.exports = function(io){
    io.on('connection', function(socket){
        socket.on('delete', function(msg){
            io.emit('delete', msg);
        });

        socket.on('update', function(data){
           io.emit('update', data);
        });


    });
};
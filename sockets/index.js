module.exports = function(io){
    io.on('connection', function(socket){

        socket.on('delete', function(msg){
            io.emit('delete', msg);
        });

        socket.on('update', function(data){
           io.emit('update', data);
        });

        socket.on('share', function(data){
            io.emit('share', {table: GLOBAL.iostable});
        });

        socket.on('clean', function(data){
            var allIds = GLOBAL.iostable.map(function(line){
                return line['_id'];
            });
            var oldRow = allIds.indexOf(data['_id']);
            if(oldRow != -1){GLOBAL.iostable.splice(oldRow,1)}
            io.emit('delete', data);
        });
    });
};
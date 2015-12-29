/**
 * Created by LoicMDIVAD on 29/12/2015.
 */

var express = require('express');
var router = express.Router();

var port = process.env.IOS_PORT || 3000
var ip = process.env.IOS_HOST || '127.0.0.1'
var socket = require('socket.io-client')('http://' + ip + ':' + port);

router.post('/', function(req, res){
    var allIds = GLOBAL.iostable.map(function(line){
       return line['_id'];
    });
    var oldRow = allIds.indexOf(req.body['_id']);
    if(oldRow != -1){GLOBAL.iostable.splice(oldRow,1)}
    socket.emit('delete', req.body);
    res.json({});
});

module.exports = router;
/**
 * Created by LoicMDIVAD on 28/11/2015.
 */
var express = require('express');
var router = express.Router();

var port = process.env.IOS_PORT || 3000
var ip = process.env.IOS_HOST || '127.0.0.1'

var socket = require('socket.io-client')('http://' + ip + ':' + port);

/* Mobile only ping through POST */
router.post('/', function(req, res){
    var data = req.body.motion;
    var event = ((JSON.parse(data['upsert'])) ? 'update' : 'delete');

    socket.emit(event, data);
    //TODO: Find an utility to the mobile response.
    res.json({ user: 'tobi' });
    res.end();
});

module.exports = router;
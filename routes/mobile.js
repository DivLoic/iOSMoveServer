/**
 * Created by LoicMDIVAD on 28/11/2015.
 */
var express = require('express');
var jquery = require('jquery');
var Tabular = require('../public/javascripts/tabular_logic.js');
var table = new Tabular(jquery);
var router = express.Router();

var port = process.env.IOS_PORT || 3000
var ip = process.env.IOS_HOST || '127.0.0.1'
var socket = require('socket.io-client')('http://' + ip + ':' + port);

router.post('/', function(req, res){
    var data = JSON.parse(req.body.motion);
    var event = ((data['upsert']) ? 'update' : 'delete');

    GLOBAL.iostable = table.inmemory(GLOBAL.iostable, data);

    socket.emit(event, data);

    //TODO: Find an utility to the mobile response.
    res.json({ user: 'tobi', state : GLOBAL.iostable});
    res.end();
});

module.exports = router;
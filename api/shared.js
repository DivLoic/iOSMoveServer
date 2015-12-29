/**
 * Created by LoicMDIVAD on 28/12/2015.
 */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
  res.json({table: GLOBAL.iostable});
});

module.exports = router;
/**
 * Created by LoicMDIVAD on 28/11/2015.
 */
var chai = require('chai');
var assert = chai.assert;
var Tabular  = require('../public/javascripts/tabular_logic.js');
var $ = require('jquery');
// TODO: Review jQuery & front unit test
//var jsdom = require('jsdom').jsdom;
//var document = jsdom('<!doctype html><html><body></body></html>');
//var window = document.createWindow();
//var jQuery = require('jQuery').create(window);

describe('test of the class tabular', function(){

    var t = new Tabular($);
    var allmobiles = [];

    beforeEach(function() {
        allmobiles = [
            {_id: "Z12TY", x:"1", y:"0.5", z:"0.2", time:""},
            {_id: "6T862", x:"0.2", y:"1", z:"0.5", time:""},
            {_id: "O931Y", x:"0.5", y:"0.1", z:"1", time:""}
        ];
    });
    it('should return front-end', function(){
        //and pass anyway
        assert.equal(true, true);
        assert.equal("front-end", t.scope);
    });

    /*it('should return a jQuery instance', function(){
        assert.equal(t.$, $);
    });

    it('should return a dom document', function(){

    });*/

    it('should deal with unvalid data', function(){
        chai.assert.isFalse(t.validDoc({x: "0.6", y: "0,5", upsert: false}));
        chai.assert.isTrue(t.validDoc({_id: 'abc', upsert: false}));
        chai.assert.isTrue(t.validDoc({_id: 'abc', x: '0.1', y: '0.2', z: '0.3', time: "19:24:00", upsert: true}));
        chai.assert.isFalse(t.validDoc({_id: 'abc', x: '0.1', y: '0.2', upsert: true}));
    });

    it('should return the same global array', function(){
        // old mobile in the route
        var newdoc = {_id: "Z12TY", x:"1", y:"0.5", z:"0.2", time:"", upsert: true};
        var mobiles1 = t.inmemory(allmobiles, newdoc);

        assert(t.validDoc(newdoc));
        assert.equal(allmobiles.length, mobiles1.length, "");
        assert.include(mobiles1, newdoc);
        assert.notDeepEqual(allmobiles, mobiles1);
    });

    it('shoul return a one more element global array', function(){
        // new mobile in the route
        var newdoc = {_id: "AZERT", x:"1", y:"0.5", z:"0.2", time:"", upsert: true};
        var mobiles2 = t.inmemory(allmobiles, newdoc);

        assert.notEqual(allmobiles.length, mobiles2.length);
        assert.equal(allmobiles.length + 1, mobiles2.length);
    });

    it('should return the same global array', function(){
        var newdoc = {_id: "AZERT", x:"1", y:"0.5", time:"", upsert: true};
        var mobiles3 = t.inmemory(allmobiles, newdoc);

        assert.equal(allmobiles.length, mobiles3.length);
        assert.deepEqual(allmobiles, mobiles3);
    });
});
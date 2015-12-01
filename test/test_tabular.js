/**
 * Created by LoicMDIVAD on 28/11/2015.
 */
var assert = require('assert');
var chai = require('chai');
var Tabular  = require('../public/javascripts/tabular_logic.js');
var $ = require('jQuery');
// TODO: Review jQuery & front unit test
//var jsdom = require('jsdom').jsdom;
//var document = jsdom('<!doctype html><html><body></body></html>');
//var window = document.createWindow();
//var jQuery = require('jQuery').create(window);

describe('test of the test', function(){

    var t = new Tabular($);
    it('should return front-end', function(){
        //and pass anyway
        assert.equal(true, true);
        assert.equal("front-end", t.scope);
    });

    it('should return a jQuery instance', function(){
        assert.equal(t.$, $);

    });

    it('should deal with unvalid data', function(){
        chai.assert.isFalse(t.validDoc({x: "0.6", y: "0,5", upsert: false}));
        chai.assert.isTrue(t.validDoc({_id: 'abc', upsert: false}));
        chai.assert.isTrue(t.validDoc({_id: 'abc', x: '0.1', y: '0.2', z: '0.3', time: "19:24:00", upsert: true}));
        chai.assert.isFalse(t.validDoc({_id: 'abc', x: '0.1', y: '0.2', upsert: true}));
    });


    it('should return a dom document', function(){

    })
});
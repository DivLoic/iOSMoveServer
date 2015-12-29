/**
 * Created by LoicMDIVAD on 29/12/2015.
 */
var chai = require('chai');
var assert = chai.assert;
var Kototsu = require('../public/javascripts/cleaner_logic.js');

describe('test of the class cleaner', function(){

    var t1 = null;
    var t2 = null;

    var k = new Kototsu();
    /*beforeEach(){

    }*/

    it('should print a date', function(){
        var d = new Date();
        console.log(d.toISOString());
        var dd = Date.parse("2015-12-29T17:49:57.541Z");
        var dd2 = Date.parse("2015-12-29T17:50:03.541Z");
        console.log(typeof(dd));
        console.log(typeof(dd2));
        console.log(dd2 - dd);//.getTime()
        console.log(new Date().toISOString());
    });

    it('shoul compare 2 dates', function(){
        assert.isTrue(k.isExpired("2015-12-29T17:49:57.541Z", "2015-12-29T17:50:03.541Z", 6000));
        assert.isFalse(k.isExpired("2015-12-29T18:14:09.309Z", "2015-12-29T18:14:11.675Z", 6000));
        assert.isTrue(k.isExpired("2015-12-29T18:15:05.270Z", "2015-12-29T18:15:25.127Z", 6000));
    });

});
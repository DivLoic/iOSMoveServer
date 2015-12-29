/**
 * Created by LoicMDIVAD on 29/12/2015.
 */

var Kototsu = function(){

    this.isExpired = function(date, expiry, delay){
        var d1 = Date.parse(date);
        var d2 = Date.parse(expiry);
        if(d2 - d1 >= delay){
            return true;
        } else {
            return false;
        }
    }

};

try{
    module.exports = Kototsu;
} catch(e) {
    console.log("Error in module export: " + e);
}
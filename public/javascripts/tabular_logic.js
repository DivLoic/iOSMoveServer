/**
 * Created by LoicMDIVAD on 29/11/2015.
 */
var Tabular = function(jq) {

    this.$ = jq;
    this.scope = "front-end";

    this.validDoc = function(doc){
        var res =  true;

        // All data need an _id
        if (doc['_id'] != undefined ){

            //All data are deleted or updated
            if(doc['upsert'] == false){
                res = true;
            } else if (doc['upsert'] == true){

                // All data need Three axis
                ["x","y","z", "time"].forEach(function(e){
                    if (doc[e] == undefined){ res =  false;}
                });
            }

        } else {
            res = false;
        }
        return res;
    };

    this.buildRow = function(data){
        if(this.validDoc(data)){
            var row = this.$("<tr></tr>");
            row.attr("id" , data["_id"]);
            row.append($("<td>"+data["_id"]+"</td>"));
            ["x", "y", "z", "time"].forEach(function(e){
                var cell = $("<td>"+data[e]+"</td>")
                cell.addClass(e);
                row.append(cell);
            });
            //this.$("table").append(row);
            return row.hide();
        } else {
            return null;
        }

    };

    this.removeRow = function(node){
        node.fadeOut('slow', function(){
            $(this).remove();
        });
    };

    this.updateRow = function(data){
        Object.keys(data).forEach(function(k){
            if (k !== '_id'){
                $("tr#" + data['_id'] + " td." + k).text(data[k]);
            }
        });
    };
};


try{
    module.exports = Tabular;
} catch(e) {
    console.log("Error in module export: " + e);
}

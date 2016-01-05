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
            row.append(this.$("<td><span class='fa fa-apple'></span></td>"));
            row.append(this.$("<td>"+data["_id"]+"</td>"));

            // optionals keys
            ["owner"].forEach(function(e){
                try{
                    var value = data[e];
                    row.append(this.$("<td>"+data[e]+"</td>").addClass(e));
                } catch(e) { }
            });

            // mendatory keys
            ["x", "y", "z", "time"].forEach(function(e){
                var cell = this.$("<td>"+data[e]+"</td>");
                cell.addClass(e);
                row.append(cell);
            });

            return row;
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
        $("tr#" + data['_id']).attr('data-start', new Date().toISOString());
    };


    this.inmemory = function(ref, document){
        var table  = ref.slice();
        if(this.validDoc(document)) {
            var ids = table.map(function (e) {
                return e["_id"];
            });

            var index = ids.indexOf(document["_id"]);

            if (index != -1) {
                table.splice(index, 1);
            }
            table.push(document);
        }
        return table;
    }

};

try{
    module.exports = Tabular;
} catch(e) {
    console.log("Error in module export: " + e);
}

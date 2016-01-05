/**
 * Created by LoicMDIVAD on 28/12/2015.
 */

$( document ).ready(function() {

    blink = function(apple){
        apple.toggleClass('green')
            .delay('600')
            .queue(function(){
                $(this).toggleClass('green');
                $(this).dequeue();
            });
    };

    // --  cool ink scroll
    $('a[href^="#"]').click(function(e){
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    // -- fixed nav bar
    $(window).scroll(function () {
        if ($(window).scrollTop() > '260') {
            $('header nav').addClass('navbar-fixed-top');
            $('#content').css('margin-top","55px');
        } else {
            $('header nav').removeClass('navbar-fixed-top');
            $('#content').css('margin-top','0px');
        }
    });

    // -- welcome table
    onShare = function(data, t){
        data['table'].forEach(function(line){
            var row = t.buildRow(line);
            row.attr('data-start', new Date().toISOString());
            $('div#table div table tbody').append(row);
            row.fadeIn('slow');
        });
    };

    // -- cleaner
    doClean = function(socket, cleaner){
        $('div#table div table tbody tr').each(function(row){
            var iso = $(this).attr('data-start');
            var id = $( this).attr('id');
            if(cleaner.isExpired(iso, new Date().toISOString(), delay)){
                socket.emit('clean', {'_id': id, 'since': iso});
            }
        });
    };

    // -- try it
    var domform = $("#try form");
    var tryid = Math.floor(Math.random() * (9999 - 1000 +1)) + 1000;
    $("#try form input[name='id']").attr('placeholder', 'id:'+tryid);
    $("#try form input[name='id']").attr('data-info', tryid);
    $("#try form button").click(function(e){
        e.preventDefault();
        var d = new Date();
        var ping = {"_id": $("#try form input[name='id']")
            .attr("data-info"),
            "x": $("#try form input[name='x']").val(),
            "y": $("#try form input[name='y']").val(),
            "z": $("#try form input[name='z']").val(),
            "owner": $("#try form input[name='owner']").val(),
            "time": d.getHours()+":"+d.getUTCMinutes()+":"+ d.getUTCSeconds(),
            "upsert": true};

        $("a[href='#table']").first().trigger("click");
        $.post("/mobile/", {motion: JSON.stringify(ping)}, function(){});
    });

    //-- typed
    $(".typedone").typed({
        strings: ["II.3510 Mobile technologies from ISEP"],
        typeSpeed: 0.5,
        showCursor: false,
        callback: function() {
            $(".typedtwo").typed({
            strings: ["and"],
            typeSpeed: 0.5,
            showCursor: false,
            callback: function(){
                    $(".typedthree").typed({
                    strings: ["Android Developement ^1000",
                        "iOS Developement",
                        "iOS / Swift Developement"],
                    typeSpeed: 0.5
                });}
        })}
    });

});


/**
 * Created by LoicMDIVAD on 28/12/2015.
 */

$( document ).ready(function() {

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
        if ($(window).scrollTop() > '200') {
            $('header nav').addClass('navbar-fixed-top');
            $('#content').css('margin-top","55px');
        } else {
            $('header nav').removeClass('navbar-fixed-top');
            $('#content').css('margin-top','0px');
        }
    });

    // -- welcome table
    var t = new Tabular($);
    $.post('/shared/', {}, function(data){
        data['table'].forEach(function(line){
            var row = t.buildRow(line);
            row.attr('data-start', new Date().toISOString());
            $('table tbody').append(row);
            row.fadeIn('slow');
        });
    });

    // -- cleaner
    var delay = 6000;
    var cleaner = new Kototsu();
    setInterval(function(){
        $('table tbody tr').each(function(row){
            var iso = $(this).attr('data-start');
            var id = $( this).attr('id');
            if(cleaner.isExpired(iso, new Date().toISOString(), delay)){
                $.post('/clean/', {'_id': id, 'since': iso}, function(){});
            }
        });
    }, delay);


});


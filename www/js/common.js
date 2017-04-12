
(function($){

    // Parse the arguments out of the url
    $.GET = (function(a){
        if (a == "") return {};
        var b = {};
        for(var i = 0; i < a.length; ++i){
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

})(jQuery);

// Added January 2015 - Alfredo
// This code snippet will check any popup windows for external links and apply the new window code and glyph
// The problem that occurred was that the HTML was in a js string that wasn't made into HTML until the popup 
// loads, so we're just waiting on that event to happen in order to trigger the external link code update.
$(document).ready(function() {
    $('#popup').on('shown.bs.modal', function (e) {
        // Handle external links openening in system browser + insert the external link icon
        $("a[href^='http']").attr("onclick", function(){
            return "event.preventDefault(); window.open('" + $(this).attr('href') + "','_system','location=yes')";
        }).attr("href","#").append('<span class="glyphicon glyphicon-new-window"></span>');
    });
});
// -- end of addition

$(function(){    
    // Handle external links openening in system browser + insert the external link icon
    $("a[href^='http']").attr("onclick", function(){
        return "event.preventDefault(); window.open('" + $(this).attr('href') + "','_system','location=yes')";
    }).attr("href","#").append('<span class="glyphicon glyphicon-new-window"></span>');
    
    // Insert icons for into popup links
    $("a[href^='#'][data-target]").append('<span class="glyphicon glyphicon-info-sign"></span>');
    
    // open specific section of page if it is linked to (example url "index.html?d=2",  number is 0 based, so the first section on a page is section 0)
    var d = $.GET.d;
    if(!isNaN(d)){
        var divs = $("div[data-toggle='collapse']");
        if(divs.length > d){
            var div = $(divs[d]);
            if(div.hasClass('collapsed'))
                div.click().focus();
            $('html,body').animate({scrollTop: div.offset().top - 10});
        }
    }

    // Fix margins if the header is taller because of a smaller screen, so that it doesn't cover text
    function resized(){
        $("body").css("margin-top", ($(".navbar-fixed-top").height() || 0) + "px");
    }
    
    // Fix hash link offest cause of fixed header,  without this things don't line up properly when linking to a specific #section
    $("a[href^='#']").click(function(){setTimeout(offset,5)});
    function offset(){
        if($(window.location.hash).length){
            $('body').scrollTop($(window.location.hash).position().top - ($(".navbar-fixed-top").height() + 15));
        }
    }
    setTimeout(offset,500);
    
    // Trigger the function to check the margins if the window changes size
    $(window).resize(resized);
    resized();
    
    // Make the "Treatment" buttons on infections pages darker.
    $('.panel-heading:has(.link)').css("background-color","#2b4a2b");

    var PopUpObj = null;

    $("[data-toggle='tooltip']").tooltip({
        container: "body"
    }).on('shown.bs.tooltip', function () {
        PopUpObj = this;
    }).on('hide.bs.tooltip', function () {
        PopUpObj = null;
    });

    $('body').on('click', function () {
        if (PopUpObj != null)
           $(PopUpObj).click();
    }); 
});
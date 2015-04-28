(function($) {
    //------WOW init------------------
    var wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });

    $(window).load(function () {
        wow.init();
    });
})(jQuery);
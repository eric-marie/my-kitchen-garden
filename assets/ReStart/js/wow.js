(function($) {
    window.ReStart = window.ReStart || {};
    window.ReStart.wow = function() {
        //------WOW init------------------
        var wow = new WOW({
            animateClass: 'animated',
            offset: 100
        });

        $(window).load(function () {
            wow.init();
        });
    };

    window.ReStart.wow();
})(jQuery);
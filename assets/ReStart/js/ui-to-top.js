(function($) {
    $(document).ready(function () {
        window.ReStart = window.ReStart || {};
        window.ReStart.uiToTop = function() {
            $('#toTop').unbind('click.UItoTop'); // Fix multi event bug
            $().UItoTop({easingType: 'easeOutQuart'});

            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                // Yep, it's Safari =)
                $('.portfolio_item figcaption p').addClass('safari');
            }
        };

        window.ReStart.uiToTop();
    });
})(jQuery);
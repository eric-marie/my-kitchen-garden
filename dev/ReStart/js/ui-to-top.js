(function($) {
    $(document).ready(function () {
        $().UItoTop({easingType: 'easeOutQuart'});

        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            // Yep, it's Safari =)
            $('.portfolio_item figcaption p').addClass('safari');
        }
    });
})(jQuery);
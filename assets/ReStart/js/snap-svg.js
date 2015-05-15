(function ($) {
    window.ReStart = window.ReStart || {};
    window.ReStart.snapSvg = function() {
        var speed = 330,
            easing = mina.backout;

        setTimeout(function() {
            $('.portfolio_item > a').each(function() {
                var s = Snap(this.querySelector('svg')),
                    path = s.select('path'),
                    pathConfig = {
                        from: path.attr('d'),
                        to: this.getAttribute('data-path-hover')
                    };

                $(this).on('mouseenter', function () {
                    path.animate({'path': pathConfig.to}, speed, easing);
                });

                $(this).on('mouseleave', function () {
                    path.animate({'path': pathConfig.from}, speed, easing);
                });
            });
        }, 1000);
    };

    window.ReStart.snapSvg();
})(jQuery);
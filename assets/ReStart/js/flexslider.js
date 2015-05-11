(function ($) {
    $(document).ready(function () {
        window.ReStart = window.ReStart || {};
        window.ReStart.flexSlider = function() {
            //------FlexSlider Homepage------------------
            $('#main_flexslider, #portfolio_slider, #carousel').flexslider({});
        };

        window.ReStart.flexSlider();
    });
})(jQuery);
(function ($) {
    $(document).ready(function () {
        //------Collapsing Header Effect------------------
        var headerHeight = $('header').outerHeight(),
            fullPagePhotoHeight = $('.full_page_photo').outerHeight(),
            totalHeight = headerHeight + fullPagePhotoHeight,
            nav = $('.collapsing_header header'),
            window_top = $(window).scrollTop();

        $(window).scroll(function () {
            if ($(this).scrollTop() > fullPagePhotoHeight) {
                nav.addClass("absolute");
                nav.css("top", fullPagePhotoHeight);
            } else {
                nav.removeClass("absolute");
                nav.css("top", "0");
            }
        });

        if (window_top > fullPagePhotoHeight) {
            nav.addClass("absolute");
            nav.css("top", fullPagePhotoHeight);
        } else {
            nav.removeClass("absolute");
            nav.css("top", "0");
        }

        $('.collapsing_header .full_page_photo').css("top", headerHeight);
        $('.collapsing_header .main').css("top", totalHeight);
        $('.collapsing_header footer').css("top", totalHeight - 40);
    });
})(jQuery);
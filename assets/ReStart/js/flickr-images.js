(function($) {
    $(document).ready(function () {
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?id=30211629@N03&tags=vegetables&format=json&lang=fr-fr&jsoncallback=?';
        $.getJSON(url, function (data) {
            var target = $('ul', $('#latest-flickr-images'));
            for (var i = 0; i <= 9; i = i + 1) {
                var pic = data.items[i];
                var liNumber = i + 1;
                target.append("<li class='flickr-image no-" + liNumber + "'><a title='" + pic.title + "' href='" + pic.link + "'><img src='" + pic.media.m + "' /></a></li>");
            }
        });
    });
})(jQuery);
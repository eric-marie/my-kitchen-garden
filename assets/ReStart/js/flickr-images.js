(function($) {
    // $(window).load() au lieu de $(document).load() :
    // Permet d'attendre que tous les js, css, images, fonts... soient chargées
    // Ensuite on charge le script Flickr pour qu'il ne ralentisse pas le chargement d'autres contenus
    $(window).load(function () {
        var url = window.location.protocol + '//api.flickr.com/services/feeds/photos_public.gne?id=30211629@N03&tags=vegetables&format=json&lang=fr-fr&jsoncallback=?';
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
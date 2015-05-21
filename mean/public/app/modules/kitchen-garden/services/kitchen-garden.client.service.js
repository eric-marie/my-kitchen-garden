'use strict';

angular.module('kitchen-garden').factory('KitchenGarden', [
	function() {
        var mriServer = 'http://192.168.33.10:8888/';
		return {
            getOptions: function() {
                var response = $.ajax({
                    type: 'GET',
                    url: mriServer + 'select-options-json',
                    global: false,
                    async: false
                }).responseJSON;

                var result = [];
                for(var key in response) {
                    if(response.hasOwnProperty(key)) {
                        result.push({value: key, label: response[key]});
                    }
                }

                return result;
            },
            getResults: function(ingredients, typeRepas, vegetarien, page, results) {
                if(1 == page) {
                    results = [];
                }

                var url = mriServer + '?';
                var queryParts = [];
                // Critère de recherche
                ingredients = ingredients.replace(' ', '+').toLowerCase();
                if ('' != ingredients) {
                    queryParts.push('aqt=' + ingredients);
                    // Pour forcer la recherche dans les ingrédients
                    queryParts.push('st=1');
                }
                // Pour trier pour les plats végétariens
                if (vegetarien) {
                    queryParts.push('veg=1');
                }
                // Le type de plat
                for (var key in typeRepas) {
                    if (typeRepas.hasOwnProperty(key)) {
                        queryParts.push('dt=' + typeRepas[key]);
                    }
                }
                // Tri par nombre de votes décroissant
                queryParts.push('sort=popularitydesc');
                // Page (par 10 donc 0 => page 1, 10 => page 2, 20 => page 3, etc.)
                var decalage = (page - 1) * 10;
                if (0 < decalage) {
                    queryParts.push('start=' + decalage);
                }

                url = url + queryParts.join('&');

                var response = $.ajax({
                    type: 'GET',
                    url: url,
                    global: false,
                    async: false
                }).responseJSON;

                var count = response.count + ' / ' + response.total;

                for (var i = 0; i < response.result.length; i++) {
                    var note = parseInt(response.result[i].note);
                    response.result[i].note = '';
                    for (var j = 0; j < note; j++) {
                        response.result[i].note += '<i class="glyphicon glyphicon-star"></i>';
                    }
                    for (j = 0; j < 5 - note; j++) {
                        response.result[i].note += '<i class="glyphicon glyphicon-star-empty"></i>';
                    }
                }

                results = results.concat(response.result);

                return {
                    results: results,
                    count: count
                }
            }
        };
	}
]);
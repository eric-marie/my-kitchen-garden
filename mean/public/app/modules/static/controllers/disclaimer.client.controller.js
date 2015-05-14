'use strict';

angular.module('static').controller('DisclaimerController', ['$scope', '$sce', '$location', 'Authentication',
    function($scope, $sce, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        if('terms-of-use' == $location.hash()) {
            var $tou = $('#terms-of-use');
            $tou.css('background-color', '#f5f5f5');
            var $nextP = $('+ p', $tou);
            $nextP.css('background-color', '#f5f5f5');
            $('+ p', $nextP).css('background-color', '#f5f5f5');
        }

        $scope.siteInfo = {
            url: $sce.trustAsHtml('<a href="http://www.my-kitchen-garden.fr" target="_blank">www.my-kitchen-garden.fr</a>'),
            statutProprietaire: "societe",
            prefix: "SAS",
            nomSociete: "My Kitchen Garden",
            adresse: "Route Hurtault 77300 Fontainebleau",
            tel: "(+33) 01.02.03.04.05",
            capital: "30 000 €",
            siret: "123 456 782 00010",
            rcs: "123 456 782",
            tva: "FR01 234 567 890",
            email: $sce.trustAsHtml('<a href="mailto:contact@my-kitchen-garden.fr?subject=Contact à partir des mentions légales">contact@my-kitchen-garden.fr</a>'),
            createurSite: "SAS My Kitchen Garden",
            responsablePublication: "SAS My Kitchen Garden",
            contactPublication: $sce.trustAsHtml('<a href="mailto:publication@my-kitchen-garden.fr?subject=Contact à partir des mentions légales">publication@my-kitchen-garden.fr</a>'),
            webmaster: "Le webmaster",
            contactWebmaster: $sce.trustAsHtml('<a href="mailto:webmaster@my-kitchen-garden.fr?subject=Contact à partir des mentions légales">webmaster@my-kitchen-garden.fr</a>'),
            adresseHebergeur: "OVH 2 rue Kellermann 59100 Roubaix"
        }
    }
]);
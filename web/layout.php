<?php
session_start();
$page = 'index';
if(isset($_GET['p'])) {
    if(file_exists($_GET['p'] . '.php')) {
        $page = $_GET['p'];
    } else {
        $page = '404';
    }
}
if (isset($_SESSION['connected']) && $_SESSION['connected']) { // Les pages auxquelles on ne peut accéder connecté
    if (in_array($page, array(
        'inscription'
    ))) {
        header('Location: layout.php');
    }
} else { // Les pages auxquelles on ne peut accéder déconnecté
    if (in_array($page, array(
        'dessin-parcelle',
        'gouts',
        'profil',
        'proposition-plantation',
        'confirmation-plantation',
        'recolte-plantation'
    ))) {
        header('Location: layout.php');
    }
}
if (isset($_GET['connect'])) {
    $_SESSION['connected'] = true;
} elseif (isset($_GET['disconnect'])) {
    $_SESSION['connected'] = false;
}
?><!doctype html>
<html class="no-js" lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Kitchen Garden</title>
    <link rel="stylesheet" type="text/css" href="css/main.min.css"/>
    <script type="text/javascript" charset="UTF-8" src="js/modernizr.min.js"></script>

    <link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="images/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
    <meta name="msapplication-TileImage" content="images/favicon/ms-icon-144x144.png">
</head>
<body class="collapsing_header">
<div id="fake-web-site">
    <div class="alert alert-info alert-dismissible fade in" role="alert">
        <button type="button" class="close" data-dismiss="alert"><span>×</span></button>
        Attention, ce site web est <strong>fictif</strong>. Il s'agit d'un projet étudiant. Les informations y figurant sont, pour tout ou parties, erronées.
    </div>
</div>
<header>
    <div class="container">
        <div class="navbar navbar-default" role="navigation">
            <div class="navbar-header">
                <a class="navbar-brand" href="layout.php">
                    <img src="images/logo.png" alt="logo de My Kitchen Garden"/>
                    <span class="logo_title">My Kitchen Garden</span>
                    <span class="logo_subtitle">Mon aide potagère !</span>
                </a>
                <a class="btn btn-navbar btn-default navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="nb_left pull-left">
                        <span class="fa fa-reorder"></span>
                    </span>
                    <span class="nb_right pull-right">menu</span>
                </a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav pull-right navbar-nav">
                    <?php if (isset($_SESSION['connected']) && $_SESSION['connected']): ?>
                        <li<?php echo 'confirmation-plantation' == $page ? ' class="active"' : '' ?>><a
                                href="layout.php?p=confirmation-plantation">Mon potager</a></li>
                        <li<?php echo 'gouts' == $page ? ' class="active"' : '' ?>><a href="layout.php?p=gouts">Mes
                                goûts</a></li>
                    <?php endif; ?>
                    <li<?php echo 'fiche' == $page ? ' class="active"' : '' ?>><a href="layout.php?p=fiche">Fiches</a></li>
                    <li<?php echo 'blog' == $page ? ' class="active"' : '' ?>><a href="layout.php?p=blog">Blog</a></li>
                    <li<?php echo 'forum' == $page ? ' class="active"' : '' ?>><a href="layout.php?p=forum">Forum</a>
                    </li>
                    <li<?php echo 'a-propos' == $page ? ' class="active"' : '' ?>><a href="layout.php?p=a-propos">A
                            propos</a></li>
                </ul>
            </div>
        </div>
        <div id="social_media_wrapper">
            <a target="_blank" href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a>
            <a target="_blank" href="https://twitter.com/"><i class="fa fa-twitter"></i></a>
            <a target="_blank" href="https://plus.google.com/"><i class="fa fa-google-plus"></i></a>
        </div>
        <div id="sign">
            <?php if (isset($_SESSION['connected']) && $_SESSION['connected']): ?>
                <a href="layout.php?p=profil"><i class="fa fa-user"></i><span>Eric</span></a>
                &nbsp;|&nbsp;
                <a href="layout.php?disconnect"><i class="fa fa-sign-out"></i><span>Déconnexion</span></a>
            <?php else: ?>
                <a href="layout.php?p=inscription"><i class="fa fa-user"></i><span>Inscription / Connexion</span></a>
            <?php endif; ?>
        </div>
    </div>
</header>
<?php
include($page . '.php');
?>
<footer>
    <section id="footer_teasers_wrapper">
        <div class="container">
            <div class="row">
                <div class="footer_teaser col-sm-4">
                    <h3>A propos de nous</h3>

                    <p>
                        My Kitchen Garden est le projet tutoré d'un groupe d'étudiants de l'<a target="_blank"
                                                                                               href="http://www.iutsf.u-pec.fr/">IUT
                            de Sénart/Fontainebleau</a> en Licence Professionnelle Systèmes Informatiques et Logiciels
                        (option Bases de Données Internet et SEcurité).
                    </p>

                    <p><i class="fa fa-map-marker"></i> Route Hurtault 77300 Fontainebleau</p>

                    <p><i class="fa fa-phone"></i> (+33) 01.02.03.04.05</p>

                    <p><i class="fa fa-print"></i> (+33) 01.02.03.04.05</p>

                    <p><i class="fa fa-envelope"></i> contact@my-kitchen-garden.com</p>
                </div>
                <div class="footer_teaser col-sm-4">
                    <h3>Derniers articles</h3>
                    <ul class="media-list">
                        <li class="media">
                            <a href="layout.php?p=blog-post" class="media-date">1<span>AVR</span></a>
                            <h5 class="media-heading">
                                <a href="layout.php?p=blog-post">Fugiat dapibus, tellus ac cursus...</a>
                            </h5>

                            <p>Duis est enim, feugiat sit amet sollicitudin ut, mattis interdum quam. Ut euismod libero nec orci vulputate lobortis. Class aptent taciti sociosqu ad litora...</p>
                        </li>
                        <li class="media">
                            <a href="layout.php?p=blog-post" class="media-date">1<span>AVR</span></a>
                            <h5 class="media-heading">
                                <a href="layout.php?p=blog-post">Fugiat dapibus, tellus ac cursus...</a>
                            </h5>

                            <p>Duis est enim, feugiat sit amet sollicitudin ut, mattis interdum quam. Ut euismod libero nec orci vulputate lobortis. Class aptent taciti sociosqu ad litora...</p>
                        </li>
                    </ul>
                </div>
                <div class="footer_teaser col-sm-4" id="latest-flickr-images">
                    <h3>Flux Flickr</h3>
                    <!-- Ne pas supprimer cet UL : contient les photos flickr -->
                    <ul></ul>
                    <p>Toutes les photos © par <a target="_blank" href="https://www.flickr.com/photos/rerinha/">Vanessa
                            Dualib</a>.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="copyright">
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    Copyright ©2014-2015 tous droits réservés
                </div>
                <div class="text-center col-sm-4">
                    <a href="layout.php?p=contact">Contactez-nous</a>
                    &nbsp;|&nbsp;
                    <a href="layout.php?p=mentions-legales">Mentions légales</a>
                </div>
                <div class="text-right col-sm-4">
                    Directed by <a target="_blank" href="http://www.iut-fbleau.fr/">IUT de Fontainebleau</a>
                </div>
            </div>
        </div>
    </section>
</footer>
<script type="text/javascript" charset="UTF-8" src="js/main.min.js"></script>
</body>
</html>
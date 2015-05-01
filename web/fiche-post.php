<div class="main">
    <div class="container">
        <section class="hgroup">
            <h1>Fiches</h1>
            <ul class="breadcrumb pull-right">
                <li><a href="layout.php">Accueil</a></li>
                <li><a href="layout.php?p=fiche">Fiches</a></li>
            </ul>
        </section>
        <section>
            <?php
            $filePath = 'fiche-post/' . $_GET['i'] . '.php';
            $item = isset($_GET['i']) && file_exists($filePath) ? $_GET['i'] : null;
            if (is_null($item)):
                ?>
                <div class="alert alert-danger" role="alert">
                    <strong>Oups !</strong> Cette fiche n'existe pas. <a href="layout.php?p=fiche">Retourner à la liste</a>.
                </div>
            <?php
            else:
                include($filePath);
            endif;
            ?>
        </section>
    </div>
</div>
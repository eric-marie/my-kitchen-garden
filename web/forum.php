<div class="main">
    <div class="container">
        <section class="hgroup">
            <h1>Forum</h1>
            <ul class="breadcrumb pull-right">
                <li><a href="layout.php">Accueil</a></li>
                <li class="active">Forum</li>
            </ul>
        </section>
        <section>
            <?php
            for($i = 0 ; $i < 5 ; $i++):
            ?>
            <div class="row">
                <div class="col-sm-8">
                    <h3 class="margin-none"><a href="layout.php?p=forum-categorie">Ma catégorie de la mort qui tue</a></h3>
                    <p>Avec sa petite description</p>
                </div>
                <div class="col-sm-4">
                    Dernier sujet : <a href="layout.php?p=forum-post">Le super poste</a><br />
                    par : <a>Eric Marie</a><br />
                    472 sujets
                </div>
            </div>
            <?php
            if($i != 4):
            ?>
            <hr />
            <?php
            endif;
            endfor;
            ?>
        </section>
    </div>
</div>
<div class="main">
    <div class="container">
        <section class="hgroup">
            <h1>Ma catégorie de la mort qui tue</h1>
            <ul class="breadcrumb pull-right">
                <li><a href="layout.php">Accueil</a></li>
                <li><a href="layout.php?p=forum">Forum</a></li>
                <li class="active">Ma catégorie de la mort qui tue</li>
            </ul>
        </section>
        <section>
            <?php
            for($i = 0 ; $i < 5 ; $i++):
                ?>
                <div class="row">
                    <div class="col-sm-8">
                        <h3 class="margin-none">
                            <a href="layout.php?p=forum-post">Le super poste</a>
                            <?php
                            if($i % 2 != 0):
                                ?>
                                &ndash;
                                <small><i><a href="layout.php?p=forum-post">(dernière réponse)</a></i></small>
                            <?php
                            endif;
                            ?>
                        </h3>
                        <p>
                            par : <a>Eric Marie</a>
                            &ndash;
                            Le 13/05/2015 à 12:47
                        </p>
                        <p class="trop-long">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut nisi in quam eleifend placerat id lobortis neque. Aenean tortor mauris, congue nec suscipit non, mattis eu nibh. Sed tincidunt eros nec venenatis porttitor. Donec elementum lacus eu est malesuada gravida. Donec ac tellus odio. Praesent posuere porttitor eleifend. Nunc fringilla eleifend luctus. Donec metus tortor, pharetra in condimentum sit amet, pretium non odio.</p>
                    </div>
                    <div class="col-sm-4">
                        <?php
                        if($i % 2 == 0):
                        ?>
                            <i>aucune réponse</i>
                        <?php
                        else:
                        ?>
                            Dernière réponse : <a>Stéphane Masselot</a><br />
                            Le 13/05/2015 à 13:01
                        <?php
                        endif;
                        ?>
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
            <nav class="text-center">
                <ul class="pagination">
                    <li><a href="#"><span aria-hidden="true">«</span></a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#"><span aria-hidden="true">»</span></a></li>
                </ul>
            </nav>
        </section>
    </div>
</div>
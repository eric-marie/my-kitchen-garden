<div class="main">
    <div class="container">
        <section class="hgroup">
            <h1>Inscription / Connexion</h1>
            <ul class="breadcrumb pull-right">
                <li><a href="layout.php">Accueil</a></li>
                <li class="active">Inscription / Connexion</li>
            </ul>
        </section>
        <section>
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <div class="signin">
                        <div class="social_sign">
                            <h3>Connectez-vous avec vos comptes de réseaux sociaux</h3>
                            <a href="https://www.facebook.com/" target="popup" class="fb"
                               onclick="window.open('https://www.facebook.com/','name','width=600,height=400')"><i
                                    class="fa fa-facebook"></i></a>
                            <a href="https://twitter.com/" target="popup" class="tw"
                               onclick="window.open('https://twitter.com/','name','width=600,height=400')"><i
                                    class="fa fa-twitter"></i></a>
                            <a href="https://plus.google.com/" target="popup" class="gp"
                               onclick="window.open('https://plus.google.com/','name','width=600,height=400')"><i
                                    class="fa fa-google-plus"></i></a>
                        </div>
                        <div class="or">
                            <div class="or_l"></div>
                            <span>ou</span>
                            <div class="or_r"></div>
                        </div>
                        <p class="sign_title">Connectez-vous avec votre compte My Kitchen Garden</p>
                        <div class="row">
                            <div class="form col-lg-8 col-lg-offset-2">
                                <form method="post" action="layout.php?connect">
                                    <input name="username" placeholder="Nom d'utilisateur" class="form-control" type="text" />
                                    <input name="password" placeholder="Mot de passe" class="form-control" type="text" />
                                    <div class="forgot">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox"> Se souvenir de moi
                                            </label>
                                        </div>
                                        <a href="layout.php?p=mot-de-passe-oublie">Mot de passe oublié ?</a></div>
                                    <button type="submit" class="btn btn-primary btn-lg">Connexion</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="signup">
                        <form method="post" action="layout.php?p=inscription">
                            <fieldset>
                                <div class="social_sign">
                                    <h3>Vous n'avez pas encore de compte My Kitchen Garden ?</h3>
                                    <a><i class="fa fa-user"></i></a>
                                </div>
                                <p class="sign_title">Créez-en un maintenant, c'est simple &amp; gratuit !</p>
                                <div class="row">
                                    <div class="col-lg-8 col-lg-offset-2">
                                        <input name="username" placeholder="Nom d'utilisateur" class="form-control" required type="text" />
                                        <input name="email" placeholder="Email" class="form-control" required type="email" />
                                        <input name="password" placeholder="Mot de passe" class="form-control" required type="password" />
                                        <input name="password-confirm" placeholder="Confirmation de mot de passe" class="form-control" required type="password" />
                                        <div class="checkbox">
                                            <label class="">
                                                <input name="terms-conditions" value="1" type="checkbox" /> J'accèpte les <a href="layout.php?p=conditions-utilisation">conditions d'utilisation</a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success btn-lg">Créez votre compte</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
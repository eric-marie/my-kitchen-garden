#!/bin/bash
# On test d'abord si Node existe déjà pour ne pas relancer le provisionning
if ! type "node" > /dev/null; then
    # On se place à la home pour installer Node
    cd /home/vagrant
    sudo apt-get install -y git-core build-essential libssl-dev
    git clone https://github.com/joyent/node.git nodejs_src
    cd nodejs_src
    # Choix de la version de Node.js
    git checkout v0.12.2
    ./configure --openssl-libpath=/usr/lib/ssl
    make
    make test
    sudo make install
    # On retourne dans le dossier mkg à la fin de l'installation
    cd /home/vagrant/mkg
else
    echo "NodeJS est deja installe"
fi
# On test d'abord si la config NPM existe déjà pour ne pas relancer le provisionning
if ! [ -f /home/vagrant/.npmrc ]; then
    # Définition de l'emplacement des librairies globales de npm
    echo 'prefix=/home/vagrant/.npm_modules' > /home/vagrant/.npmrc
    # Ajout de ce chemin dans le PATH dans le .profile
    echo 'if [ -d "$HOME/.npm_modules" ] ; then' >> /home/vagrant/.profile
    echo '    PATH="$PATH:/home/vagrant/.npm_modules/bin"' >> /home/vagrant/.profile
    echo 'fi' >> /home/vagrant/.profile
else
    echo "La config NPM est deja installee"
fi
# On test d'abord si le dossier des modules node de MKG existe déjà pour ne pas relancer le provisionning
if ! [ -d /home/vagrant/mkg_node_modules ]; then
    mkdir /home/vagrant/mkg_node_modules
    cd /home/vagrant/mkg/mean
    ln -ls /home/vagrant/mkg_node_modules node_modules
    cd /home/vagrant/mkg
else
    echo "Le dossier des modules node de MKG existe deja"
fi
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
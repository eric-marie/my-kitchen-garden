#!/bin/bash
# On test d'abord si MongoDB existe déjà pour ne pas relancer le provisionning
if ! type "mongo" > /dev/null; then
    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    apt-get update
    apt-get install -y mongodb-org
    # On ajoute un démarrage automatique de MongoDB au démarrage de la VM
    echo 'sudo service mongod start' >> /home/vagrant/startup.sh
fi
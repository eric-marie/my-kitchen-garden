#!/bin/bash
# On test d'abord si Bower existe déjà pour ne pas relancer le provisionning
if ! type "bower" > /dev/null; then
    sudo npm install -g bower
else
    echo "Bower est deja installe"
fi
# On test d'abord si Bower existe déjà pour ne pas relancer le provisionning
if ! type "grunt" > /dev/null; then
    sudo npm install -g grunt-cli
else
    echo "Grunt est deja installe"
fi
# On test d'abord si MEAN existe déjà pour ne pas relancer le provisionning
if ! type "mean" > /dev/null; then
    sudo npm install -g mean-cli
else
    echo "MEAN est deja installe"
fi
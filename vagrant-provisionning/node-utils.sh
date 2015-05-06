#!/bin/bash
if ! type "bower" > /dev/null; then npm install -g bower
else echo "Bower est deja installe" ; fi

if ! type "grunt" > /dev/null; then npm install -g grunt-cli
else echo "Grunt est deja installe" ; fi

if ! type "nodemon" > /dev/null; then npm install -g nodemon
else echo "Nodemon est deja installe" ; fi

if ! type "express" > /dev/null; then npm install -g express-generator
else echo "Express est deja installe" ; fi
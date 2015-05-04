#!/bin/bash
if ! type "bower" > /dev/null; then npm install -g bower ; fi
if ! type "grunt" > /dev/null; then npm install -g grunt-cli ; fi
if ! type "nodemon" > /dev/null; then npm install -g nodemon ; fi
if ! type "express" > /dev/null; then npm install -g express-generator ; fi

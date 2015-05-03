#!/bin/sh
if ! [ -f /home/vagrant/startup.sh ]; then
    # Création du script de startup
    touch /home/vagrant/startup.sh
    chmod +x /home/vagrant/startup.sh
    echo '#!/bin/sh' > /home/vagrant/startup.sh
    # Ajout du script de startup au démarrage du système
    echo '#!/bin/sh -e' | sudo tee /etc/rc.local
    echo '/home/vagrant/./startup.sh' | sudo tee --append  /etc/rc.local
    echo 'exit 0' | sudo tee --append  /etc/rc.local
else
    echo "Le script de startup est deja installe"
fi
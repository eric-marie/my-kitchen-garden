# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # https://atlas.hashicorp.com/search.
  config.vm.box = "chef/debian-7.8"

  config.vm.network "forwarded_port", guest: 1337, host: 1337
  config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"

  config.vm.synced_folder "./", "/home/vagrant/mkg"

  config.vm.provider "virtualbox" do |vb|
    # Affiche l'IHM VirtualBox au démarrage de la machine
    # vb.gui = true
    vb.memory = 512
    # vb.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL
    # Mise en place du système Debian
    sudo apt-get update
    sudo apt-get upgrade -y
    sudo apt-get install -y dos2unix

    # On se place à la racine des provisionning
    cd /home/vagrant/mkg/vagrant-provisionning/

    # On execute les provisionning dans l'ordre
    dos2unix startup.sh && ./startup.sh
    dos2unix nodejs.sh && ./nodejs.sh
    dos2unix mongodb.sh && ./mongodb.sh
    dos2unix node-utils.sh && ./node-utils.sh
  SHELL
end
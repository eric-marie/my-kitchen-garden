# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # La box vient de : https://atlas.hashicorp.com/search.
  config.vm.box = "chef/debian-7.8"

  config.vm.network "forwarded_port", guest: 1337, host: 1337
  config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"

  config.vm.provider "virtualbox" do |vb|
    # Affiche l'IHM VirtualBox au démarrage de la machine
    # vb.gui = true
    vb.memory = 512
    # vb.cpus = 2
    vb.customize ["sharedfolder", "add", :id, "--name", "mkg", "--hostpath", (("//?/" + File.dirname(__FILE__)).gsub("/","\\"))]
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/mkg", "1"]
  end

  # Provision de montage du répertoire partagé
  config.vm.provision :shell, run: "always", inline: <<-SHELL
    if [ ! -d /home/vagrant/mkg ]; then
      mkdir /home/vagrant/mkg
    fi
    mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` mkg /home/vagrant/mkg
  SHELL

  # Provision avec privilège ROOT
  config.vm.provision :shell, inline: <<-SHELL
    # Mise en place du système Debian
    apt-get update
    apt-get upgrade -y
    apt-get install -y dos2unix

    # On se place à la racine des provisionning
    cd /home/vagrant/mkg/vagrant-provisionning/

    # On execute les provisionning dans l'ordre
    dos2unix startup.sh && ./startup.sh
    dos2unix nodejs.sh && ./nodejs.sh
    dos2unix mongodb.sh && ./mongodb.sh
  SHELL

  # Provision sans privilège ROOT
  config.vm.provision :shell, privileged: false, inline: <<-SHELL
    # On se place à la racine des provisionning
    cd /home/vagrant/mkg/vagrant-provisionning/

    # On execute les provisionning dans l'ordre
    dos2unix node-utils.sh && ./node-utils.sh
  SHELL
end
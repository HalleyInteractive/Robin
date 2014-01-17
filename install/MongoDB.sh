# http://c-mobberley.com/wordpress/index.php/2013/10/14/raspberry-pi-mongodb-installation-the-working-guide/
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-linux/
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/

# Debian
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 -y
# echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

# Ubuntu
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 -y
# echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

# sudo apt-get update
# sudo apt-get install mongodb-10gen -y

## Raspberry PI
#
# sudo apt-get update
# sudo apt-get upgrade
#
# sudo apt-get install build-essential libboost-filesystem-dev libboost-program-options-dev libboost-system-dev libboost-thread-dev scons libboost-all-dev python-pymongo git -y
#
# git clone https://github.com/skrabban/mongo-nonx86
# cd mongo-nonx86
# sudo scons
# sudo scons --prefix=/opt/mongo install
## Permissions for users and groups:
# sudo adduser --firstuid 100 --ingroup nogroup --shell /etc/false --disabled-password --gecos "" --no-create-home mongodb
# A folder for our log files to go:
# sudo mkdir /var/log/mongodb/
## Permissions for log file:
# sudo chown mongodb:nogroup /var/log/mongodb/
## A folder for our state data:
# sudo mkdir /var/lib/mongodb
## Permissions for the folder:
# sudo chown mongodb:nogroup /var/lib/mongodb
## Moving our init.d script to etc:
# sudo cp debian/init.d /etc/init.d/mongod
## Moving our config file to etc:
# sudo cp debian/mongodb.conf /etc/
## Linking folders up:
# sudo ln -s /opt/mongo/bin/mongod /usr/bin/mongod
#
# sudo chmod u+x /etc/init.d/mongod
# sudo update-rc.d mongod defaults
# sudo /etc/init.d/mongod start
#
## clear scons cache
# scons -c

# Install the needed packages on Raspian:
sudo apt-get install git-core build-essential scons libpcre++-dev xulrunner-dev libboost-dev libboost-program-options-dev libboost-thread-dev libboost-filesystem-dev -y

# Checkout this repo:
git clone git://github.com/RickP/mongopi.git

# Build it (this will take very long!):
cd mongopi
scons

# Install it:
sudo scons --prefix=/opt/mongo install

# clear scons cache
scons -c

# This will install mongo in /opt/mongo, to get other programs to see it, you can add this dir to your $PATH:
PATH=$PATH:/opt/mongo/bin/
export PATH

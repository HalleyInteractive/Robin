# http://c-mobberley.com/wordpress/index.php/2013/10/14/raspberry-pi-mongodb-installation-the-working-guide/
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-linux/
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/

# Debian
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 -y
echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

# Ubuntu
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 -y
# echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

sudo apt-get update
sudo apt-get install mongodb-10gen -y

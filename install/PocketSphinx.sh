# http://robot.laylamah.com/?p=35

sudo apt-get remove pulseaudio -y
sudo aptitude purge pulseaudio -y
sudo mv /usr/include/pulse/pulseaudio.h /usr/include/pulse/pulseaudio.h.old

sudo apt-get install alsa-utils -y
sudo apt-get install bison -y
sudo apt-get install libasound2-dev -y
sudo apt-get install pocketsphinx-utils -y

# wget http://sourceforge.net/projects/cmusphinx/files/sphinxbase/0.8/sphinxbase-0.8.tar.gz
# gzip -d sphinxbase-0.8.tar.gz
# tar -xvf sphinxbase-0.8.tar
# cd sphinxbase-0.8
# ./configure
# make
# sudo make install

# wget http://sourceforge.net/projects/cmusphinx/files/pocketsphinx/0.8/pocketsphinx-0.8.tar.gz
# gzip -d pocketsphinx-0.8.tar.gz
# tar -xvf pocketsphinx-0.8.tar
# cd pocketsphinx-0.8
# ./configure
# make
# sudo make install

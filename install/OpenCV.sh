sudo apt-get install cmake -y

sudo apt-get update
sudo apt-get install build-essential -y
sudo apt-get install libavformat-dev -y
sudo apt-get install x264 v4l-utils ffmpeg -y
sudo apt-get install libcv2.3 libcvaux2.3 libhighgui2.3 python-opencv opencv-doc libcv-dev libcvaux-dev libhighgui-dev -y

wget http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.7/opencv-2.4.7.tar.gz
tar -xzvf opencv-2.4.7.tar.gz
cd opencv-2.4.7

mkdir build
cd build
cmake -D WITH_TBB=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D WITH_V4L=ON -D WITH_OPENGL=ON ..

make
sudo make install

sudo modprobe uvcvideo

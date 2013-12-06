sudo apt-get install chmake -y

mkdir opencv-node
# Clone fresh copy of OpenCV
git clone https://github.com/Itseez/opencv.git opencv-node

# Prepare build and install dirs
mkdir opencv-node-build
mkdir opencv-node-bin
cd opencv-node-build

# Configure OpenCV
cmake ../opencv-node -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX=../opencv-node-bin

# Build and install OpenCV libs
make install

# sudo modprobe uvcvideo

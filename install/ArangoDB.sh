wget https://www.arangodb.org/repositories/raspbian/arangodb-1.4.5-raspbian.deb
sudo dpkg -i arangodb-1.4.5-raspbian.deb
rm arangodb-1.4.5-raspbian.deb

echo "Creating Database Robin"
curl -X POST -H "Content-Type: application/json" -d '{"name":"Robin"}' http://127.0.0.1:8529/_api/database

echo "\nCreating Database Collection Voice"
curl -X POST -H "Content-Type: application/json" -d '{"name":"Voice"}' http://localhost:8529/_db/Robin/_api/collection

echo "\nCreating Database Collection Settings"
curl -X POST -H "Content-Type: application/json" -d '{"name":"Settings"}' http://localhost:8529/_db/Robin/_api/collection

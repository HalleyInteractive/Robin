sudo add-apt-repository ppa:rethinkdb/ppa   && \
sudo apt-get update                         && \
sudo apt-get install rethinkdb

# Starting rethinkdb
# rethinkdb --http-port 8083

sudo apt-get install python-pip
sudo pip install rethinkdb

# Backup rethinkdb
# rethinkdb dump -f install/robin_db_dump.tar.gz -e Robin

# Restore backup
rethinkdb restore install/robin_db_dump.tar.gz

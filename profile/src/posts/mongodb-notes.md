---
title: Mongodb Notes
date: 2019-09-27 02:35:51
tags:
- Javascript
- Nodejs
categories: Notes
---

Install(ubuntu)
``` bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

Start/Stop MongoDB

sudo service mongod start
sudo service mongod stop
sudo service mongod restart

#begin
mongo
```
## Advantage

Simple than relational Database, match objects, as document(JSON) database, store as **BSON**(Binary JSON)

- Json representation
- Javascript shell commands
- Easy access
- Flexible indexing

## Syntax

### Input:

JSON

### Output:

- **ID Field**, can be default assign as `_id`, or specified

### Queries:
``` bash
#will not throw exception
db.users.find({first_name: "John"})
db.users.find({first_name: "John", last_name: "Martin"})

db.users.update({first_name: "John", {
    "first_name": "John",
    "last_name": "Martin",
    "address": "1226 W Adams"
})
db.users.update({first_name: "John", {
    $set: {"last_name": "Smith"}
})

#embeded, nested array
db.users.update({first_name: "John", {
    $set: {"phone": [
        "111-111-1111",
        "222-222-2222"
    ]}
})

db.users.find({phone: "111-111-1111"})

db.users.remove({first_name: "John"})
db.users.drop()
```
## Shell

``` bash
use learning_mongo #create new database or find exsit

show dbs #GB usages

# insert
db.cars.insert({"make":"toyota"})
show collections #cars

# support javascript, like console

db.numbers.find({"number": 1})
db.numbers.find({"number": 1}).explain()
db.numbers.find({"number": 1}).explain(executionStats)



# Import
mongoimport --db learning_mongo --collection tours --jsonArray --file tours.json

# count
db.tours.cout()
db.tours.createIndex({tourPackage: 1}) #create index for what we want to search, no quotes
db.tours.createIndex({tourPrice: 1, tourLength:1})
```
# NodeJs with Mongodb
``` javascript
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learning_mongo';

var findDocuments = function(db, callback) {
    var collection = db.collection('tours');

    collection.find({"tourPackage":"Snowboard Cali"}).toArray(function(err, docs) {
        console.log(docs);
        callback;
    })
}

MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
    findDocuments(db, function () {
        db.close();
    })
    
})
```
# Hapi with mongodb

*Read & Write*

...

[Add APIs for read requests in Hapi](https://www.lynda.com/Moodle-tutorials/Add-APIs-read-requests-Hapi/573253/611692-4.html?srchtrk=index%3a3%0alinktypeid%3a2%0aq%3amogodb%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2)

[Install MongoDB Community Edition on Ubuntu - MongoDB Manual](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
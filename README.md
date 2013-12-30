Description
===========
This demo is a demo with users and groups with sub documents, also known as joins in SQL.

Setup
=====
Installation for development
----------------------------

Clone the repository with
```
git clone https://github.com/theotheu/users-and-groups.git ~/workspaces/users-and-groups-demo
```

Go to the working directory
```
cd ~/workspaces/users-and-groups-demo
```

Configuration
----------
Copy ```config.js.default``` to ```config.js```.
```sh
cp ~/workspaces/users-and-groups-demo/server/config/config.js.default ~/workspaces/users-and-groups-demo/server/config/config.js
```

Change the database, port and emailaddress.

```sh
vi ~/workspaces/users-and-groups-demo/server/config/config.js
```
Example
```javascript
module.exports = {
    development: {
        db: 'mongodb://localhost/p123456', // <------------ Replace this with your database name
        port: 3000, // <----------------------------------- Replace this with your port number
        mailTo: "you@example.com",  // <------------------- Replace this with your email address
        AccessControlAllowMethods: "GET,PUT,POST,DELETE",
        allowedDomains: "*"
    }
    , test: {
    }
    , production: {
    }
}
```
Import data
-----------
This is optional and not required but might be convenient.
See the separate README in the data directory.

Install node modules
--------------------
The archive is without the node modules.

Install with
```sh
cd ~/workspaces/users-and-groups-demo/server
npm install
```

supervisor
----------
Make sure you have supervisor installed - with the global option

```sh
npm install -g supervisor
```

Use it with
```sh
supervisor --no-restart-on error server.js
```

Instructions to prepare a deployment
===================================

* Verify that you have a explanatory README.md
* Make sure that the output directory exist ```mkdir ~/workspaces/users-and-groups-demo/data```
* Make an export of your data with mongodump
* ```mongodump -d p123456 -o ~/workspaces/users-and-groups-demo/data```
* (see http://docs.mongodb.org/v2.2/reference/mongodump/)
* Create in ~/workspaces/users-and-groups-demo/data a README.md with import instructions.
* Push the repository



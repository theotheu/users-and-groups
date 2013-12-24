Description
===========
This demo is the solution of users and groups with sub documents.


Setup
=====
Installation for development
----------------------------

Clone the repository with
```
git clone https://github.com/theotheu/books-solved.git ~/workspaces/users-and-groups-demo
```

Go to the working directory
```
cd ~/workspaces/users-and-groups-demo
```

Configuration
----------
Copy ```config.js.default``` to ```config.js```.
```sh
cp ~/workspaces/users-and-groups-demo/server/config/config.js.default ~/workspaces/booksDemo/server/config/config.js
```

Change the database, port and emailaddress.

Example
```javascript
module.exports = {
    development: {
        db: 'mongodb://localhost/p123456',
        port: 3000,
        mailTo: "you@example.com",
        AccessControlAllowMethods: "GET,PUT,POST,DELETE",
        allowedDomains: "*"
    }
    , test: {
    }
    , production: {
    }
}
```

Install node modules
----------
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
supervisor --no-restart-on error app.js
```

Instructions to prepare a deployment
===================================

* Verify that you have a explanatory README.md
* Make an export of your data with mongodump
** ```mongodump --collection users --db p123456 --out ~/workspaces/users-and-groups-demo/data```
** ```mongodump --collection groups --db p123456 --out ~/workspaces/users-and-groups-demo/data```
* (see http://docs.mongodb.org/v2.2/reference/mongodump/)
* Push the repository
*


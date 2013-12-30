Import instructions
===========
1. Replace ```p123456``` with the name of your database.
2. Import the data
3. Done


Import seed per collection
```
mongorestore --collection users --db p123456 ~/workspaces/users-and-groups-demo/data/seed/users.bson
mongorestore --collection users --db p123456 ~/workspaces/users-and-groups-demo/data/seed/users.metadata.json
mongorestore --collection groups --db p123456 ~/workspaces/users-and-groups-demo/data/seed/groups.bson
mongorestore --collection groups --db p123456 ~/workspaces/users-and-groups-demo/data/seed/groups.metadata.json
```

Import all data in one
```
mongorestore -d p123456 ~/workspaces/users-and-groups-demo/data/seed
```

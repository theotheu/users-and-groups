Import instructions
===========
1. Replace ```p123456``` with the name of your database.
2. Import the data (per collection or in one step)
3. Done


Import seed per collection
```
mongorestore --collection users --db p123456 ~/workspaces/users-and-groups/data/seed/users.bson
mongorestore --collection users --db p123456 ~/workspaces/users-and-groups/data/seed/users.metadata.json
mongorestore --collection groups --db p123456 ~/workspaces/users-and-groups/data/seed/groups.bson
mongorestore --collection groups --db p123456 ~/workspaces/users-and-groups/data/seed/groups.metadata.json
```

Import all data in one step
```
mongorestore -d p123456 ~/workspaces/users-and-groups/data/seed
```

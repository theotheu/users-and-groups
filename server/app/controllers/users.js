/**
 * Created by theotheu on 24-12-13.
 */

var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , Group = mongoose.model('Group')
    , passwordHash = require('password-hash');


// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
exports.create = function (req, res) {

    // Encrypt password
    console.log('CREATE user.');

    req.body.password = passwordHash.generate(req.body.password || "topSecret!");


    var doc = new User(req.body);

    doc.save(function (err) {
        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };
        return res.send(retObj);

    });

}

// RETRIEVE
// find @ http://mongoosejs.com/docs/api.html#model_Model.find
exports.list = function (req, res) {
    var conditions, fields, options;

    console.log('GET users.');

    conditions = {};
    fields = {};
    sort = {'modificationDate': -1};

    User
        .find(conditions, fields, options)
        .sort(sort)
        .exec(function (err, doc) {
            var retObj = {
                meta: {"action": "list", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        })
}

exports.detail = function (req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;

    console.log('GET 1 user. ' + req.params._id);

    conditions = req.params._id
        , fields = {}
        , options = {'createdAt': -1};

    User
        .findById(conditions, fields, options)
        .exec(function (err, doc) {
            console.log('createdBy', doc._id);

            // Find groups for user
            Group
                .find({}, function (err, groupsDoc) {
                    retDoc = [];
                    for (i = 0; i < groupsDoc.length; i++) {
                        groupDoc = {
                            _id: groupsDoc[i]._id,
                            name: groupsDoc[i].name,
                            isMember: false

                        };

                        groupsDoc[i].isMember = false;

                        if (groupsDoc[i].users && groupsDoc[i].users.length > 0) {
                            for (j = 0; j < groupsDoc[i].users.length; j++) {
                                if ((groupsDoc[i].users[j]._id + "") === (doc._id + "")) {
                                    groupDoc.isMember = true;
                                }
                            }
                        }
                        retDoc.push(groupDoc);
                    }

                    var retObj = {
                        meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                        doc: doc,
                        groups: retDoc,
                        err: err
                    };
                    return res.send(retObj);
                });

        })
}

// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
exports.update = function (req, res) {

    console.log('UPDATE user.');

    // Password validation. Can only partially be a validation rule from the model because of confirmPassword.
    if (!req.body.password || (req.body.password && req.body.password !== '' && (req.body.password.length < 8 || req.body.password !== req.body.confirmPassword))) {
        var retObj = {
            meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
            doc: null,
            err: {
                message: "Passwords must be the same and at least 8 characters. Please verify your password."
            }
        };
        return res.send(retObj);
    }

    // Make sure that password is hashed.
    req.body.password = passwordHash.generate(req.body.password || "topSecret!");

    console.log('Updating....\n', req.body);


    var conditions = req.params._id
        , update = {
            gender: req.body.gender || 'male',
            name: req.body.name || '',
            location: {
                street: req.body.location.street || '',
                city: req.body.location.city || '',
                zip: req.body.location.zip || '',
                state: req.body.location.state || ''
            },
            phone: req.body.phone || '',
            email: req.body.email || '',
            picture: req.body.picture || '',
            description: req.body.description,
            modificationDate: Date.now()
        }
        , options = { multi: false }
        , callback = function (err, doc) {
            console.log('Updated, yes!');
            var retObj = {
                meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            return res.send(retObj);
        };

    if (update.picture === '') {
        update.picture = "user.png";
    }

    if (req.body.password && req.body.password !== '') {
        update.password = req.body.password;
    }

    User
        .findByIdAndUpdate(conditions, update, options, callback);
}

// DELETE
// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
exports.delete = function (req, res) {
    var conditions, callback, retObj;

    console.log('Deleting user. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function (err, doc) {
        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };
        return res.send(retObj);
    }

    User.remove(conditions, callback);
}

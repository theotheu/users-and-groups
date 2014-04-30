/**
 * Created by theotheu on 24-12-13.
 */
module.exports = {
    development: {
        debug: true,                           // set debugging on/off
        db: 'mongodb://localhost/theotheu',     // change p123456 with your database
        port: 3000                              // change 3000 with your port number
     }, test: {
        debug: false,                           // set debugging on/off
        db: 'mongodb://localhost/theotheu',     // change p123456 with your database
        port: 3000                              // change 3000 with your port number
    }, production: {

    }
};

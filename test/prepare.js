require('dotenv').config();
const mongoose = require('mongoose');

beforeEach(function(done) {
    // clear the database before each test run
    function clearDataBase() {
        for(i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }
    if(mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.MONGO_DB_TEST, function(error) {
            if(error) {
                throw error;
            }
            return clearDataBase();
        });
    } else {
        return clearDataBase();
    }
});

afterEach(function(done) {
    mongoose.disconnect();
    done();
});
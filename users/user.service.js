const config = require('config.json');
const jwt = require('jsonwebtoken');

//mongo connection
const MongoClient = require('mongodb').MongoClient;
const dbName = 'my-database';
const bcrypt = require('bcrypt-nodejs');
var userArray;
var db;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err,client) {
    if (err) {
        return console.dir(err);
    }
    console.log('connected to users collection in user.service');
    db = client.db(dbName);
    getUsers(db);
})

function getUsers(dbObj) {
    dbObj.collection('users').find().toArray(function(err,result) {
        userArray = result.map(function(user) {
            return user;
        })
        return userArray;
    })
}
//mongo end

module.exports = {
    authenticate,
    getAll
};

function deHash(guess, storedHash) {
    bcrypt.compare(guess, storedHash, function(err,res) {
        console.log(res);
    })
}

async function authenticate({ username, password }) {
    console.log(userArray);
    console.log(deHash(password, userArray[0].password));
    const user = userArray.find(u => u.username === username);
    console.log(user);

    if (bcrypt.compareSync(password, user.password)) {
        console.log('success');
        const token = jwt.sign({ id:user._id }, config.secret, {expiresIn: '1h'});
        const { password, ...userWithoutPassword } = user;
        console.log(user);
        return {
        ...userWithoutPassword,
        token
        };
    }
}

async function getAll() {
    return userArray.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
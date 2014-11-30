var fs = require('fs');
var byline = require('byline');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

mongo.connect('mongodb://localhost:27017/twitter', function(err, db) {

  assert.equal(null, err);

  // TODO: empty the database

  var semaphore = 2;
  function callback(err) {
      --semaphore;
      if (semaphore !== 0) return;
      db.close();
  }

  var u = byline(fs.createReadStream(__dirname + '/users.json'));

  u.on('data', function(line) {
    try {
      var obj = JSON.parse(line);
      console.log(obj);
      // NOTE: obj represents a user and contains three fields:
      // obj.username: the username
      // obj.name: the full name
      // obj.followers: array of users following this user
      // obj.following: array of followed users

      // TODO: load the user into the database
      // (including the information of which users this user is following)
    } catch (err) {
      console.log("Error:", err);
    }
  });
  u.on('end', callback);


  var t = byline(fs.createReadStream(__dirname + '/sample.json'));

  t.on('data', function(line) {
    try {
      var obj = JSON.parse(line);
      console.log(obj);
      // NOTE: obj represents a tweet and contains three fields:
      // obj.created_at: UTC time when this tweet was created
      // obj.text: The actual UTF-8 text of the tweet
      // obj.username: The user who posted this tweet

      // TODO: load the tweet into the database      
    } catch (err) {
      console.log("Error:", err);
    }
  });
  t.on('end', callback);


});
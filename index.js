
var http = require("https");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var OktaAPI = require('okta-node');
var okta = new OktaAPI("your okta api token", "vanbeektech");



var namely = function(){
var goodToGo;

return new Promise(function(resolve, reject) {

var options = {
  "method": "GET",
  "hostname": "your namely url",
  "port": null,
  "path": "/api/v1/profiles",
  "headers": {
    "authorization": "Bearer your namely api key",
    "Accept": "application/json"
  }
};
var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    resolve(body.toString());
  });
});

req.write("{}");
req.end();






})

}

var oktaCreate = function(user) {



  var updated;

  return new Promise(function(resolve, reject) {
    console.log(user.first_name)


    var newUser;
    var profile = {firstName: user.first_name, lastName: user.last_name, email: user.email, login: user.email, testemail: user.personal_email}
    okta.users.add(profile, null, false, function(d) {
      console.log(d)


    })
    updated = "test"
      resolve(updated);
  });




}

var oktaGetandCompare = function(namelyUsers) {
var updated;
var array = []
var organizedNamelyUsers = []
var usersMatch = []
var arrayForUpdating = []
namelyUsers.forEach(function(element) {
    array.push(element.email)
});

var newUsers = namelyUsers.map(function(element) {
  var object = {}
  object[element.email] = element
  return object
});




return new Promise(function(resolve, reject) {

  okta.users.list({'limit':500},function(d){
    for(var i=0;i<d.resp.length;i++){
      var p = d.resp[i].profile.email;
      var id = d.resp[i].id

      if(array.includes(p)){
        console.log("yaka")
        newUsers.forEach(function(element) {
          console.log(p)
          console.log(element)
          if(element[p] != undefined){
            if (p == element[p].email){
              var sub = []
              sub.push(id)
              sub.push(element[p])
              arrayForUpdating.push(sub)
            }
          }
        })
        usersMatch.push(id)
      }
      updated = "test"

    }
    console.log(arrayForUpdating)
    resolve(arrayForUpdating)
  });

});



}



var oktaUpdate = function(userId, value) {
  var updated;

  return new Promise(function(resolve, reject) {

        okta.users.updatePartial(userId, {email : value.email, testemail: value.personal_email}, null, function(d){
          updated = "test"
          console.log(d)
          resolve(updated);
        });

  });
}







namely()

  const makeReset = async (function() {
        var otherthing = await (namely())
        console.log("test")
        var item = JSON.parse(otherthing);
        var firstPerson = item["profiles"][0]["email"]
        var person = item["profiles"][0]
        var usersFromNamely = item["profiles"]
        console.log(firstPerson)
        console.log("test")
        var yeah = await (oktaGetandCompare(item["profiles"]))
        yeah.forEach(function(person) {
          var userId = person[0]
          var profile = person[1]
          var something = await (oktaUpdate(userId, profile))

        })
        usersFromNamely.forEach(function(user){
            var test = await(oktaCreate(user))

        })
        //var something = await (oktaUpdate("00u2pf2nf1lcnOuTP1t7", item["profiles"][0]["email"]))
        //var test = await(oktaCreate(person))

    });

    makeReset()

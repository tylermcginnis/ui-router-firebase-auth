var app = angular.module('fbAuth');

app.service('authService', function($firebase, FBURL){
  var fbRef = $firebase(FBURL);
  var cachedUser = {};

  var formatEmailForFirebase =  function(email){
    var key = email.replace('@', '^');
    if(key.indexOf('.') !== -1){
      return key.split('.').join('*');
    }
    return key;
  };

  var addNewUserToFB = function(newUser){
    var key = formatEmailForFirebase(newUser.email);
    fbRef.child('user').child(key).set(newUser);
  };

  this.isLoggedIn = function(){
    return cachedUser && true || fbRef.getAuth() || false;
  };

  this.getUser = function(){
    return cachedUser || fbRef.getAuth();
  };

  this.createUser = function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", err);
        }
      } else {
          this.loginWithPW(user, function(authData){
            addNewUserToFB({
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  };

  this.loginWithPW = function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        authData.email = userObj.email;
        cachedUser = authData;
        cb(authData);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  };

  this.logout = function(){
    ref.unauth();
    cachedUser = null
  };
});
var app = angular.module('fbAuth');

app.service('authService', function($firebase, FBURL){
  var ref = new Firebase(FBURL);
  this.cachedUser = ref.getAuth();

  var addNewUserToFB = function(newUser){
    ref.child('user').child(newUser.uid).set(newUser);
  };

  this.isLoggedIn = function(){
    return !!ref.getAuth();
  };

  this.getUser = function(){
    return this.cachedUser || ref.getAuth();
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
        this.cachedUser = authData;
        cb(authData);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  };

  this.loginWithAuthPopup = function(service, cb){
    ref.authWithOAuthPopup(service, function(err, authData){
      if(err){
        console.log('Error on login: ', err.message);
      } else {
        addNewUserToFB(authData);
        this.cachedUser = authData;
        cb(authData);
      }
    }.bind(this))
  };

  this.logout = function(){
    ref.unauth();
    this.cachedUser = null;
    return true;
  };
});
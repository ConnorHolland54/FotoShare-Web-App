
let currentUser = null

  function signIn(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed In")
        storage.setItem('userEmail', fb.auth().currentUser.email)
        storage.setItem('userUID', fb.auth().currentUser.uid)
        // ...
        let loginSection = document.getElementById('login-signup-form')
        loginSection.remove()
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }

  function signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      storage.clear()
      console.log("Signed Out")
      createLoginSignupForm()
      handleSignIn()
      handleSignUp()
    }).catch((error) => {
      // An error happened.
    });
}


// Fetch for creating a user

configObject = {

}

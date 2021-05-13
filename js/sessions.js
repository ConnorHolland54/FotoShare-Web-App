

  function signIn(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(firebase.auth().currentUser.email)
        // ...
        return fb.auth().currentUser
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  function signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Signed Out")
    }).catch((error) => {
      // An error happened.
    });
}

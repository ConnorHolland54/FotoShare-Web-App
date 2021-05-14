
let currentUser = null

  function signIn(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed In")
        storage.setItem('userEmail', fb.auth().currentUser.email)
        storage.setItem('userUID', fb.auth().currentUser.uid)
        hideOrShowNavBar()
        removeSignIn()
        createHomePage()
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
    var user = userCredential.user
    CreateUser(email, fb.auth().currentUser.uid)
    removeSignIn()
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
      hideOrShowNavBar()
      removeHomepage()
      createLoginSignupForm()
      handleSignIn()
      handleSignUp()
    }).catch((error) => {
      // An error happened.
    });
}

function removeSignIn() {
  let loginSection = document.getElementById('login-signup-form')
  loginSection.remove()
}


// Fetch for creating a user
function CreateUser(email, uid) {
  config = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      email: email,
      uid: uid
    })
  }

  fetch("http://localhost:3000/users", config)
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))

}

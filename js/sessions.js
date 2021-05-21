
let currentUser = null

  function signIn(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed In")
        fetchUser(fb.auth().currentUser.uid)
        navbar.style.display = "block";
        postSection.hidden = false;
        removeSignIn()
        getPostsData().then((posts) => {
          for(let post of posts) {
            allPosts[post.id] = post
            createPostHTML(post)
          }
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user
    CreateUser(email, fb.auth().currentUser.uid)
    redirectToHome()
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
      currentUser = null
      console.log("Signed Out")
      createLoginSignupForm()
      handleSignIn()
      handleSignUp()
      navbar.hidden = true;
      postSection.hidden = true;
    }).catch((error) => {
      // An error happened.
    });
}


function removeSignIn() {
  let loginSection = document.getElementById('login-signup-form')
  loginSection.remove()
}

function fetchUser(uid) {
  fetch(`http://localhost:3000/users/${uid}`).then(resp => resp.json())
    .then(user => {
      currentUser = user[0]
      console.log(currentUser)
    })
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

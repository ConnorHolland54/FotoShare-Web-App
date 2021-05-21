// Variables
let navbar = document.getElementById('nav-bar')
let postSection = document.getElementById('PS')
let newPostBtn = document.getElementById('NewPost')
let createNewPostSection = document.getElementById('NP-section')
let newPostForm = document.getElementById('new-post-form')
let postsCol = document.getElementById('col1')

// End of variables

document.addEventListener('DOMContentLoaded', () => {
  if (currentUser) {
    navbar.style.display = 'block';
    postSection.hidden = false
  } else {
    navbar.style.display = 'none';
    createLoginSignupForm()
    handleSignIn()
    handleSignUp()
  }
  addCreatePostFormListener()
  aListener()
  postSectionlistener



  postSection.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList[0] == 'remove-post') {
      console.log("Remove")
      let postId = e.target.parentElement.id
      deletePost(postId).then(response => {
        console.log("Deleted")
        let post = document.getElementById(`${postId}`)
        post.remove();
      })
    } else if (e.target.id == 'CB') {
      let modal = document.getElementById('exampleModal');
    }
  })
})



function postSectionlistener() {
  postSection.addEventListener('click', (e) => {
    console.log(e.target.id)
  })
}

function aListener() {
  let links = document.querySelectorAll('a')
  for(let link of links) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if(e.target.id == "my-posts") {
        console.log("my posts")
        postsCol.innerHTML = "";
        getMyPosts().then(posts => {
          for(let post of posts) {
            createPostHTML(post, true)
          }
        })
        if(createNewPostSection.hidden == false) {
          createNewPostSection.hidden = true
          postSection.hidden = false
        }
      } else if (e.target.id == 'logout-btn') {
        signOut()
      } else if (e.target.id == 'NewPost') {
        postSection.hidden = true;
        createNewPostSection.hidden = false;
        handleSelectionListenerOnImages()
      } else if (e.target.id == 'fotoshareBtn') {
        hideNewPostSection()
        postsCol.innerHTML = "";
        getPostsData().then((posts) => {
          for(let post of posts) {
            createPostHTML(post)
          }
        })
      }
    })
  }
}


function createLoginSignupForm() {
    let loginSection = document.createElement('section')
    loginSection.id = 'login-signup-form'
    loginSection.classList.add("container")
    loginSection.innerHTML = `<h1>Welcome to FotoShare!</h1>`
    document.body.prepend(loginSection)

    let form = document.createElement('form')
    form.id = "login-form"
    form.innerHTML = `
      <label>Email:</label><br>
      <input type="text" name="email"><br>
      <label>Password:</label><br>
      <input type="password" name="password"><br>
      <div id="passTwo" hidden>
        <label name="passTwoLab">Re-enter password:</label><br>
        <input type="password" name="password-two"><br>
      </div>
      <input type="submit" name="login" value="Login"><br><br>
      <a>Don't have an account?</a><br><a>Forgot password?</a>
    `
    loginSection.append(form)
    let btn = document.querySelector('input[name="login"]')
    btn.style.marginTop = '4%';
    // loginSection.style.backgroundColor = 'teal';
    loginSection.style.textAlign = 'center';
    // loginSection.style.marginTop = '10%';
    // loginSection.style.marginLeft = '25%';
    // loginSection.style.marginRight = '25%';
}

function handleSignIn() {
  let btn = document.querySelector('input[name="login"]')
  let loginSection = document.getElementById('login-signup-form')
  let form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('input[name=email]').value;
    let pass = document.querySelector('input[name=password]').value;
    if (btn.value == "Sign Up") {
        signUp(email, pass)
    }
      signIn(email, pass)
  })
}

function handleSignUp() {
  let link = document.querySelector('form a');
  let form = document.getElementById('login-form');
  let btn = document.querySelector('input[name="login"]')
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let passTwoInfo = document.getElementById('passTwo')
    if (e.target.innerText == "Don't have an account?") {
      passTwoInfo.hidden = false;
      link.innerText = "Back to login"
      form.id = "signup-form"
      btn.value = "Sign Up"
    } else {
      passTwoInfo.hidden = true;
      link.innerText = "Don't have an account?"
      form.id = 'login-form'
      btn.value = "Login"
    }
  })
}

function commentsButtonListener(btn) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.path[1].id)
  })
}

function createPostHTML(x, myPost = false) {
    // let postsCol = document.getElementById('col1')
    let post = document.createElement('div')
    post.classList.add('post')
    post.id = x.id

    let image = document.createElement('img')
    image.src = x.image_url
    image.style.width = "100%";
    image.style.height = "70%";
    let label = document.createElement('label')
    label.append(document.createElement('br'))
    label.innerText = x.caption
    label.style.height = "15%"
    label.style.width = '100%'
    label.style.backgroundColor = 'lightGrey'
    let commentsBtn = document.createElement('button')
    commentsBtn.innerText = "Comments"
    commentsBtn.id = "CB"
    commentsBtn.setAttribute('data-bs-toggle', 'modal');
    commentsBtn.setAttribute('data-bs-target', '#exampleModal')
    let br = document.createElement('br')
    let removeBtn = document.createElement('button')
    removeBtn.innerText = 'Remove'
    removeBtn.classList.add('remove-post')
    post.append(image)
    post.append(label)
    label.after(document.createElement('br'))
    post.append(commentsBtn)
    if(myPost == true) {
      post.append(br, br, removeBtn)
    }
    postsCol.prepend(post)
}


function hideNewPostSection() {
  createNewPostSection.hidden = true;
  postSection.hidden = false;
}

// Create a new posts
function addCreatePostFormListener() {
  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let image = document.getElementById('currentPhoto')
    let caption = e.target.children[4].value
    let imageFile = document.getElementById('image-file')
    createPost(image.src, caption)
  })
}

// handle image selection
function handleSelectionListenerOnImages() {
  let images = document.getElementsByClassName('images')
  for(let image of images) {
    image.addEventListener('click', () => {
      let currentImage = document.getElementById('currentPhoto')
      currentImage.style.width = '30%';
      currentImage.style.heigh = '35%'
      currentImage.src = image.src
    })
  }
}


// post request to create a post
function createPost(imageUrl, caption) {
  let config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      user_id: currentUser.id,
      caption: caption,
      image_url: imageUrl
    })
  }
  fetch('http://localhost:3000/posts', config)
  .then(resp => resp.json())
  .then(data => {
    console.log("stuff")
    let p = new Post(data.id, data.image_url, data.user_id, data.caption)
    if(data.comments) {
    p.addComments(data.comments)
    }
    let image = document.getElementById('currentPhoto')
    let input = document.getElementsByTagName('input')
    hideNewPostSection()
    createPostHTML(p)
    createNewPostSection.hidden = true
    postSection.hidden = false;
    input[0].value = ""
    image.src = ""
  })
}


// Fetch Posts Test
async function getPostsData() {
  return await fetch("http://localhost:3000/posts")
  .then(resp => resp.json())
  .then((data) => {
    let allPosts = [];
    for(let post of data) {
      let p = new Post(post.id, post.image_url, post.user_id, post.caption)
      p.addComments(post.comments)
      allPosts.push(p)
    }
    return allPosts
  })
}

getPostsData().then((posts) => {
  for(let post of posts) {
    createPostHTML(post)
  }
})


// fetch my posts
async function getMyPosts() {
  return await fetch(`http://localhost:3000/users/${currentUser.id}/posts`)
  .then(resp => resp.json())
  .then((data) => {
    let allPosts = [];
    for(let post of data) {
      let p = new Post(post.id, post.image_url, post.user_id, post.caption)
      p.addComments(post.comments)
      allPosts.push(p)
    }
    return allPosts
  })
}

async function deletePost(id) {
  let config = {
    method: 'DELETE'
  }
  return await fetch(`http://localhost:3000/posts/${id}`, config).then(resp => resp.json).then(data => data)
}

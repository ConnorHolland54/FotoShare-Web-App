// Variables
let navbar = document.getElementById('nav-bar')
let postSection = document.getElementById('PS')
// End of variables

document.addEventListener('DOMContentLoaded', () => {
  if (storage.getItem('userUID')) {
    navbar.hidden = false
    postSection.hidden = false
    // createHomePage()
  } else {
    createLoginSignupForm()
    handleSignIn()
    handleSignUp()
  }
  logoutListener()
})

function createLoginSignupForm() {
    let loginSection = document.createElement('section')
    loginSection.id = 'login-signup-form'
    loginSection.innerHTML = `<h1>Welcome to FotoShare!</h1>`
    document.body.append(loginSection)

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
    loginSection.style.backgroundColor = 'teal';
    loginSection.style.textAlign = 'center';
    loginSection.style.marginTop = '10%';
    loginSection.style.marginLeft = '25%';
    loginSection.style.marginRight = '25%';
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

function logoutListener() {
  let btn = document.getElementById('logout-btn')
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    signOut()
  })
}

function createPostHTML(posts) {
  for(let post of posts) {
    let postsCol = document.getElementById('col1')
    let post = document.createElement('div')
    post.classList.add('post')

    let image = document.createElement('img')
    image.src = "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg"
    image.style.width = "100%";
    image.style.height = "70%";
    let label = document.createElement('label')
    label.append(document.createElement('br'))
    label.innerText = "Hello World"
    label.style.height = "19%"
    let commentsBtn = document.createElement('button')
    commentsBtn.innerText = "Comments"
    post.append(image)
    post.append(label)
    label.after(document.createElement('br'))
    post.append(commentsBtn)
    postsCol.append(post)
  }
}



// Fetch Posts Test
async function getPostsData() {
  return await fetch("http://localhost:3000/posts")
  .then(resp => resp.json())
  .then((data) => {
    let posts = [];
    for(let post of data) {
      let p = new Post(post.id, post.image_url, post.user_id)
      p.addComments(post.comments)
      posts.push(p)
    }
    return posts
  })
}

getPostsData().then(posts => {
  createPostHTML(posts)
})


//

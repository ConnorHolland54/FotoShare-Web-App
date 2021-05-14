document.addEventListener('DOMContentLoaded', () => {
  if (!storage.getItem('userUID')) {
      createLoginSignupForm()
      handleSignIn()
      handleSignUp()
  }
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
      <a>Don't have an account?</a>
    `
    loginSection.append(form)
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
    if (btn.value == "Login") {
        signIn(email, pass)
    } else {

    }
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

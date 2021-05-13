document.addEventListener('DOMContentLoaded', () => {
  if (!storage.getItem('userUID')) {
      createLoginSignupForm()
      handleSignIn()
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
      <input type="password" name="password"><br><br>
      <input type="submit" value="Login">
    `
    loginSection.append(form)
    loginSection.style.backgroundColor = 'teal';
    loginSection.style.textAlign = 'center';
    loginSection.style.margin = '25%';
}

function handleSignIn() {
  let loginSection = document.getElementById('login-signup-form')
  let form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('input[name=email]').value;
    let pass = document.querySelector('input[name=password]').value;
    signIn(email, pass);
  })
}

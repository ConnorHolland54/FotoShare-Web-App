document.addEventListener('DOMContentLoaded', () => {
  let loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function(event) {
    let email = document.getElementsByName('email_field')[0];
    let password = document.getElementsByName('password_field')[0];
    signIn(email.value, password.value);
    event.preventDefault();
  });

})

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Login form submitted'); // Debugging
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  loginUser(email, password);
});

function loginUser(email, password) {
  console.log('loginUser called'); // Debugging
  if (typeof Android !== 'undefined' && Android !== null) {
    const userData = Android.getUserData();
    console.log('Retrieved userData:', userData); // Debugging
    if (userData) {
      const user = JSON.parse(userData);
      if (user.email === email && user.password === password) {
        alert('Inicio de sesión exitoso');
        Android.navigateToHome();
      } else {
        alert('Email o contraseña incorrectos');
      }
    } else {
      alert('No hay datos de usuario guardados');
    }
  } else {
    console.error('Android interface not found');
  }
}

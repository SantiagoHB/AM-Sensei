document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Login form submitted'); // Debugging
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  loginUser(email, password);
});

function loginUser(email, password) {
  console.log('loginUser called'); // Debugging
  const userData = localStorage.getItem('userData');
  console.log('Retrieved userData:', userData); // Debugging
  if (userData) {
    const user = JSON.parse(userData);
    if (user.email === email && user.password === password) {
      alert('Inicio de sesión exitoso');
      window.location.href = 'home-1.html'; // Navega a la página de inicio después del inicio de sesión
    } else {
      alert('Email o contraseña incorrectos');
    }
  } else {
    alert('No hay datos de usuario guardados');
  }
}

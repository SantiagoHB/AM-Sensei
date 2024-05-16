document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Register form submitted'); // Debugging
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const confirmPassword = document.getElementById('confirmpasswordInput').value;
  const pet = document.querySelector('input[name="pet"]:checked').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const userData = {
    name: name,
    email: email,
    password: password,
    pet: pet
  };

  saveUserData(userData);
  console.log('User registered:', userData); // Debugging
  window.location.href = 'login.html'; // Navega a la página de inicio de sesión después del registro
});

function saveUserData(userData) {
  console.log('saveUserData called with data:', userData); // Debugging
  localStorage.setItem('userData', JSON.stringify(userData));
}

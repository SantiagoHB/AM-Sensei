document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Register form submitted'); // Debugging
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const confirmPassword = document.getElementById('confirmpasswordInput').value;
  const pet = document.querySelector('input[name="pet"]:checked').value;

  registerUser(name, email, password, confirmPassword, pet);
});

function registerUser(name, email, password, confirmPassword, pet) {
  console.log('registerUser called'); // Debugging
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const userData = { name, email, password, pet };
  saveUserData(userData);
}

function saveUserData(userData) {
  console.log('saveUserData called with data:', userData); // Debugging
  if (typeof Android !== 'undefined' && Android !== null) {
    Android.saveUserData(JSON.stringify(userData));
  } else {
    console.error('Android interface not found');
  }
}

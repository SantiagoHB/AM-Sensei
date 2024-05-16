document.addEventListener("DOMContentLoaded", () => {
  // Load user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    document.getElementById("profile-name").innerText =
      userData.name || "Usuario";
    document.getElementById("profile-email").innerText =
      userData.email || "Email";
    if (userData.address) {
      document.getElementById(
        "address-section"
      ).innerText = `${userData.address}\n${userData.city}, ${userData.country}`;
    }
  }

  // Handle form submission for address
  document.getElementById("addressForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (userData && userData.name === "Invitado") {
      alert("No se puede configurar como invitado");
      return; // Stop the execution here
    }

    const address = document.getElementById("direccion").value;
    const city = document.getElementById("ciudad").value;
    const country = document.getElementById("pais").value;

    if (userData) {
      userData.address = address;
      userData.city = city;
      userData.country = country;
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById(
        "address-section"
      ).innerText = `${address}\n${city}, ${country}`;

      // Close the modal
      document.getElementById("confCuenta").style.display = "none";
    }
  });

  // Handle opening and closing of the modal
  const confCuentaBtn = document.getElementById("confCuentaBtn");
  const confCuentaModal = document.getElementById("confCuenta");
  const closeBtn = document.querySelector(".close");

  confCuentaBtn.addEventListener("click", () => {
    if (userData && userData.name === "Invitado") {
      alert("No se puede configurar como invitado");
      return; // Stop the execution here
    } else {
      confCuentaModal.style.display = "block";
    }
  });

  closeBtn.addEventListener("click", () => {
    confCuentaModal.style.display = "none";
  });

  // Close the modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === confCuentaModal) {
      confCuentaModal.style.display = "none";
    }
  });
});

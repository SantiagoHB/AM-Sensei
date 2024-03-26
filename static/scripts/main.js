document.addEventListener("DOMContentLoaded", function () {
  // Function to check the scroll position
  function checkScroll() {
    var arrowDown = document.querySelector(".arrow-down");
    if (arrowDown) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Hide the arrow if we're at the bottom of the page
        arrowDown.style.display = "none";
      } else {
        // Show the arrow otherwise
        arrowDown.style.display = "flex";
      }
    }
  }

  // Listen for a click event on the arrow-down button
  document.querySelector(".arrow-down")?.addEventListener("click", function () {
    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

  // Check scroll position whenever the user scrolls
  window.addEventListener("scroll", checkScroll);

  // Initial check in case the page loads at the bottom
  checkScroll();

  // Modal functionality
  var modal = document.getElementById("confCuenta");
  var btn = document.getElementById("confCuentaBtn");
  var close = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  if (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    };
  }

  // When the user clicks on <span> (x), close the modal
  if (close) {
    close.onclick = function () {
      modal.style.display = "none";
    };
  }

  // Close the modal when the user clicks anywhere outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Dropdown functionality
  var dropbtn = document.querySelector(".dropbtn");
  if (dropbtn) {
    dropbtn.addEventListener("click", function (event) {
      // Stop the click event from closing the dropdown immediately
      event.stopPropagation();
      this.nextElementSibling.classList.toggle("show");
    });
  }

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  });

  // Load products into dropdown and setup click event for loading product details
  fetch("/get-products")
    .then((response) => response.json())
    .then((data) => {
      const dropdown = document.querySelector(".dropdown-content");
      data.forEach((product) => {
        const a = document.createElement("a");
        a.textContent = product.descripcion;
        a.href = "javascript:void(0);"; // Prevent the page from navigating away
        a.addEventListener("click", function () {
          loadProductDetails(product.codigo_producto);
        });
        dropdown.appendChild(a);
      });
    });
});

// Function for loading product details
function loadProductDetails(codigoProducto) {
  fetch(`/get-product-details/${codigoProducto}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("descripcion").textContent =
        data.descripcion || "Descripción no disponible";
      document.getElementById("codigo-barra").textContent =
        data.codigo_barra || "Código de Barra no disponible";
      document.getElementById("codigo-producto").textContent =
        data.codigo_producto || "Código de Producto no disponible";
      // Mostrar el precio express como flotante, asegurándose de que sea un número
      document.getElementById("precio-express").textContent =
        typeof data.express === "number"
          ? `$${data.express.toFixed(2)}`
          : "Precio no disponible";
    })
    .catch((error) => {
      console.error("Error al cargar los detalles del producto:", error);
    });
}

fetch("/get-brands")
  .then((response) => response.json())
  .then((brands) => {
    const brandDropdown = document.getElementById("brand-dropdown");
    brands.forEach((brand) => {
      const option = document.createElement("option");
      option.textContent = brand;
      option.value = brand;
      brandDropdown.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error loading brands:", error);
  });

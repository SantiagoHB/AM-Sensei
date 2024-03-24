// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  function scrollToGroup(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  }

  var arrowDown = document.querySelector(".arrow-down");

  // Function to check the scroll position
  function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Hide the arrow if we're at the bottom of the page
      arrowDown.style.display = "none";
    } else {
      // Show the arrow otherwise
      arrowDown.style.display = "flex";
    }
  }

  // Listen for a click event on the arrow-down button
  arrowDown.addEventListener("click", function () {
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
});

// Get the modal
var modal = document.getElementById("confCuenta");

// Get the button that opens the modal
var btn = document.getElementById("confCuentaBtn");

// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  modal.style.display = "none";
};

// If you want to close the modal when the user clicks anywhere outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

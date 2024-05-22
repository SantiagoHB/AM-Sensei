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

  // Scroll functionality for alphabet buttons
  function scrollToGroup(groupId) {
    var groupElement = document.getElementById(groupId);
    if (groupElement) {
      groupElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Add event listeners to alphabet buttons
  var alphabetButtons = document.querySelectorAll(".alphabet-list button");
  alphabetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var targetGroup = button.textContent + "-group";
      scrollToGroup(targetGroup);
    });
  });
});

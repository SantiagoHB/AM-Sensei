function scrollToGroup(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  var arrowDown = document.querySelector('.arrow-down');

  // Function to check the scroll position
  function checkScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // Hide the arrow if we're at the bottom of the page
      arrowDown.style.display = 'none';
    } else {
      // Show the arrow otherwise
      arrowDown.style.display = 'flex';
    }
  }

  // Listen for a click event on the arrow-down button
  arrowDown.addEventListener('click', function () {
    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });

  // Check scroll position whenever the user scrolls
  window.addEventListener('scroll', checkScroll);

  // Initial check in case the page loads at the bottom
  checkScroll();
});




// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Dropdown toggle for sub-buttons
document.addEventListener("DOMContentLoaded", function () {
  // Loop through all dropdown buttons
  document.querySelectorAll(".dropdown > .btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Close other dropdowns
      document.querySelectorAll(".dropdown-content").forEach((menu) => {
        if (menu !== this.nextElementSibling) {
          menu.classList.remove("show");
        }
      });

      // Toggle this one
      this.nextElementSibling.classList.toggle("show");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.classList.remove("show");
    });
  });
});

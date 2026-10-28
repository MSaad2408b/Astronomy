document.addEventListener("DOMContentLoaded", function () {

  // Navbar elements
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const menuIcon = menuToggle ? menuToggle.querySelector(".menu-icon") : null;

  // Open and close mobile menu
  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {
      // Toggle '.is-active' class matching CSS
      const isOpen = navMenu.classList.toggle("is-active");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      if (menuIcon) {
        menuIcon.textContent = isOpen ? "✕" : "☰";
      }
    });

    // Close menu after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
          menuIcon.textContent = "☰";
        }
      });
    });

    // Close menu when switching back to desktop width (matches 768px CSS breakpoint)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
          menuIcon.textContent = "☰";
        }
      }
    });
  }

  // Highlight the current page automatically
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // Geolocation feature for observatories page
  const geoStatus = document.getElementById("geo-status");
  const locateBtn = document.getElementById("locate-btn");

  if (locateBtn && geoStatus) {

    locateBtn.addEventListener("click", function () {

      if (!navigator.geolocation) {
        geoStatus.textContent = "Geolocation is not supported by your browser.";
        return;
      }

      geoStatus.textContent = "Requesting your location...";

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);

          geoStatus.textContent =
            "Your approximate location: " +
            lat + "°, " + lon +
            "°. Scroll down to explore observatories and their map locations.";
        },

        function (error) {
          let message = "Unable to retrieve location. ";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              message += "Permission was denied.";
              break;

            case error.POSITION_UNAVAILABLE:
              message += "Location information is unavailable.";
              break;

            case error.TIMEOUT:
              message += "The request timed out.";
              break;

            default:
              message += "An unknown error occurred.";
          }

          geoStatus.textContent = message;
        },

        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

});
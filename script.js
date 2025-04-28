console.log("script.js loaded");


// header
const header = document.getElementById("header");
let showHeaderTimeout;

function showHeaderOnScroll() {
  if (window.scrollY > 50) {
    header.classList.add("show");
  } else {
    header.classList.remove("show");
  }
}

function showHeaderOnMousemove(event) {
  if (event.clientY <= 50) {
    header.classList.add("show");
    clearTimeout(showHeaderTimeout);
  } else if (window.scrollY <= 50) {
    showHeaderTimeout = setTimeout(() => {
      header.classList.remove("show");
    }, 100);
  }
}

window.addEventListener("scroll", showHeaderOnScroll);
window.addEventListener("mousemove", showHeaderOnMousemove);

// Dashboard navigation
const dashboardLinks = document.querySelectorAll(".dashboard-link");
const dashboardTitle = document.getElementById("dashboard-title");
const dashboardContent = document.getElementById("dashboard-content");
const dashboardSections = document.querySelectorAll(".dashboard-section");

function hideAllSections() {
  dashboardSections.forEach((section) => {
    section.classList.add("hidden");
  });
}

function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
  }
}

function setActiveLink(link) {
  dashboardLinks.forEach((l) => l.classList.remove("active-link"));
  link.classList.add("active-link");
}

dashboardLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const contentId = link.getAttribute("data-content");

    hideAllSections();
    dashboardContent.classList.add("hidden");

    if (contentId) {
        showSection(contentId);
    } else {
        dashboardContent.classList.remove('hidden');
    }

    setActiveLink(link);
    dashboardTitle.textContent = link.textContent;
  });
});

//initial state
if (window.location.hash) {
  const hashTarget = window.location.hash.substring(1); // Remove the '#'
  const linkToActivate = document.querySelector(`a[href="#${hashTarget}"]`);

  // Check if the link exists and if it's a dashboard link
  if (linkToActivate && linkToActivate.classList.contains("dashboard-link")) {
    linkToActivate.click(); // Programmatically trigger the click event
  }
} else {
  // No hash in URL, activate the first link
  const firstLink = dashboardLinks[0];
  if (firstLink) {
    firstLink.click(); // Programmatically trigger the click event
    }
}

// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded


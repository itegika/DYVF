document.addEventListener("DOMContentLoaded", () => {
    setEventDetails();
    checkRegistrationStatus();
    initNavigation();
    initModal();
});

let IS_REGISTRATION_OPEN = true;

const EVENT_DATE = "25 FEB";
const EVENT_YEAR = "2024";
const REGISTRATION_CLOSE_DATE = new Date("2024-01-25T23:59:59");
const EVENT_LOCATION = "DUBAI, SILICON OASIS, HALISE ACADEMY THEATRE";
const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSeb5GyJFm8717mgmQt0U6OjLiOqrzNUKu4euyFEDotvPnOjxw/viewform?usp=sf_link&hl=en";

const formLinks = document.querySelectorAll(".form-link");

function setEventDetails() {
  document.getElementById("eventDate").textContent = EVENT_DATE;
  document.getElementById("eventYear").textContent = EVENT_YEAR;
  const formattedLocation = EVENT_LOCATION.split(",").join(",<br>");
  document.getElementById("eventLocation").innerHTML = formattedLocation;

  formLinks.forEach(link => {
      link.href = FORM_LINK;
  });
}

function checkRegistrationStatus() {
  const dateToday = new Date();
  const registrationStatus = document.getElementById("registrationStatus");
  const applyButton = document.querySelector(".apply-btn");

  if (IS_REGISTRATION_OPEN && dateToday < REGISTRATION_CLOSE_DATE) {
    console.log('go');
    registrationStatus.textContent = `REGISTRATION CLOSES ON ${(REGISTRATION_CLOSE_DATE).toLocaleDateString(
      "en-GB",
      { month: "short", day: "numeric" }
    )}`;
  } else {
    registrationStatus.textContent = "REGISTRATION CLOSED";
    applyButton.style.display = "none";
    IS_REGISTRATION_OPEN = false;
  }
}

function initNavigation() {
  const navToggle = document.querySelector(".mob-menu__toggle");
  const closeMenuButton = document.querySelector(".close-menu");
  const navLinks = document.querySelectorAll(".nav__link, .mob-nav__link");

  navToggle.addEventListener("click", () => toggleMobMenu(true));
  closeMenuButton.addEventListener("click", () => toggleMobMenu(false));
  navLinks.forEach((link) =>
    link.addEventListener("click", handleNavLinkClick)
  );
}

function toggleMobMenu(isOpen) {
  const mobMenu = document.querySelector(".mob-menu-overlay");
  mobMenu.style.display = isOpen ? "flex" : "none";
}

function handleNavLinkClick(event) {
  const link = event.target.closest(".nav__link, .mob-nav__link");
  if (!link) return;

  const targetId = link.getAttribute("href");
  if (targetId.startsWith("#")) {
    event.preventDefault();

    if (
      window.getComputedStyle(document.querySelector(".mob-menu-overlay"))
        .display !== "none"
    ) {
      toggleMobMenu(false);
      setTimeout(() => {
        smoothScrollTo(targetId);
      }, 300);
    } else {
      smoothScrollTo(targetId);
    }
  }
}

function smoothScrollTo(targetId) {
  document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
}

function initModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalButton = document.querySelector('.modal-close');
    
    closeModalButton.addEventListener('click', () => {
        modalBackdrop.style.display = 'none';
    });

   formLinks.forEach(item => {
        item.addEventListener('click', (event) => {
            if (!IS_REGISTRATION_OPEN || new Date() > REGISTRATION_CLOSE_DATE) {
                event.preventDefault();
                modalBackdrop.style.display = 'flex';
            }
        });
    });
}
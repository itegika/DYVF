document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

function initNavigation() {
    const navToggle = document.querySelector('.mob-menu__toggle');
    const closeMenuButton = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav__link, .mob-nav__link');

    navToggle.addEventListener('click', () => toggleMobMenu(true));
    closeMenuButton.addEventListener('click', () => toggleMobMenu(false));
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
}

function toggleMobMenu(isOpen) {
    const mobMenu = document.querySelector('.mob-menu-overlay');
    mobMenu.style.display = isOpen ? 'flex' : 'none';
}

function handleNavLinkClick(event) {
    const link = event.target.closest('.nav__link, .mob-nav__link');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
        event.preventDefault();

        if (window.getComputedStyle(document.querySelector('.mob-menu-overlay')).display !== 'none') {
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
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
}

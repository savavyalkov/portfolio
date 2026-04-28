const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (formSuccess) {
            formSuccess.classList.add('show');
        }
        bookingForm.reset();

        setTimeout(() => {
            if (formSuccess) {
                formSuccess.classList.remove('show');
            }
        }, 3000);
    });
}

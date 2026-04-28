const burgerToggle = document.getElementById('burgerToggle');
const topNav = document.getElementById('topNav');

if (burgerToggle && topNav) {
    burgerToggle.addEventListener('click', () => {
        burgerToggle.classList.toggle('active');
        topNav.classList.toggle('active');
    });

    // Закрывать меню при клике на ссылку
    topNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerToggle.classList.remove('active');
            topNav.classList.remove('active');
        });
    });
}

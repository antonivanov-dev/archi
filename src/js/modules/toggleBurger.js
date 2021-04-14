const toggleBurger = () => {
    const burgerBtn = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');

    document.addEventListener('click', event => {
        const target = event.target;

        if (burgerBtn.classList.contains('burger--active') && !target.closest('#sidebar')) {
            burgerBtn.classList.remove('burger--active');
            sidebar.classList.remove('sidebar--active');

        } else if (target.closest('button#burger')) {
            burgerBtn.classList.toggle('burger--active');
            sidebar.classList.toggle('sidebar--active');
        }
    })

    window.addEventListener('scroll', () => {
        if (burgerBtn.classList.contains('burger--active')
            && sidebar.classList.contains('sidebar--active')) {

            burgerBtn.classList.remove('burger--active');
            sidebar.classList.remove('sidebar--active');
        }
    });
}

export default toggleBurger;
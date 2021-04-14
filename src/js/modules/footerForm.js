import { validate } from "./validate";

const footerForm = () => {
    const form = document.getElementById('footerForm');

    form.addEventListener('focusin', event => {
        let target = event.target;

        target = target.closest('.footer-form__input-group');

        if (target) {
            target.classList.add('footer-form__input-group--active');
        }
    });

    form.addEventListener('focusout', event => {
        let target = event.target;

        target = target.closest('.footer-form__input-group');

        if (target) {
            const input = target.querySelector('.footer-form__input');
            const label = target.querySelector('.footer-form__label');

            target.classList.remove('footer-form__input-group--active');

            if (input.value !== '') {
                label.classList.add('not-empty');
            } else {
                label.classList.remove('not-empty');
            }
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        const target = event.target;

        validate(target);
    });
}

export default footerForm;
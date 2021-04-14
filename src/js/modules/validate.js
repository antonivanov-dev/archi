
export const validate = (form) => {
    form.addEventListener('input', event => {
        let input = event.target;

        if (input) {
            const nameAttr = input.getAttribute('name')
            switch (nameAttr) {
                case 'name':
                    console.log("it is name input");
                    break;
                case 'email':
                    console.log("it is email input");
                    break;
                case 'location':
                    console.log("it is location input");
                    break;
                case 'phone':
                    console.log("it is phone input");
                    break;
            }
        }
    });
}
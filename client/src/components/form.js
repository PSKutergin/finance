import User from "../store/user";

export class Form {
    constructor(page) {
        this.page = page;

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: 'user',
                    id: 'user',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/,
                    valid: false,
                }
            );
            this.fields.push(
                {
                    name: 'password-repeat',
                    id: 'password-repeat',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false,
                }
            );
        }

        const that = this;

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.addEventListener('input', () => {
                that.isEmptyField();
                that.inputSuccess(item.element.parentNode)
            })
        });

        this.processElement = document.getElementById('process');
        this.processElement.addEventListener('click', (e) => {
            e.preventDefault()
            that.processForm()
        })
    }

    validateFields() {
        this.fields.forEach(field => {
            if (!field.element.value || !field.element.value.match(field.regex)) {
                this.inputError(field.element.parentNode);
                field.valid = false;
            } else {
                this.inputSuccess(field.element.parentNode);
                field.valid = true;
            }
            if (this.page === 'signup') this.validatePasswords();
        })
    }

    validatePasswords() {
        const password = this.fields.find(item => item.name === 'password');
        const passwordRepeat = this.fields.find(item => item.name === 'password-repeat');

        if (!password.element.value || !passwordRepeat.element.value) return
        if (password.element.value !== passwordRepeat.element.value) {
            this.inputError(password.element.parentNode);
            password.valid = false;
            this.inputError(passwordRepeat.element.parentNode);
            passwordRepeat.valid = false;
        }
    }

    isEmptyField() {
        const isEmpty = this.fields.every(item => !!item.element.value);

        if (isEmpty) {
            this.processElement.removeAttribute('disabled')
        } else {
            this.processElement.setAttribute('disabled', 'disabled')
        }
    }

    validateForm() {
        this.validateFields();
        const isValid = this.fields.every(item => item.valid);

        return isValid
    }

    async processForm() {
        if (this.validateForm()) {
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;

            if (this.page === 'signup') {
                const fullName = this.fields.find(item => item.name === 'user').element.value;
                const lastName = fullName.split(' ')[0];
                const name = fullName.split(' ')[1];
                const passwordRepeat = this.fields.find(item => item.name === 'password-repeat').element.value;

                User.registration(name, lastName, email, password, passwordRepeat);
            } else {
                User.login(email, password);
            }

        }
    }

    inputError(element) {
        element.classList.add('error');
    }

    inputSuccess(element) {
        element.classList.remove('error');
    }
}
// Валидатор для Formik
export default ({isAuth, values, errors}) => {
            const rules = {
                        email: value => {
                                    if (!value) {
                                                errors.email = 'Введите E-mail';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                                errors.email = 'Некорректный E-mail';
                                    }
                        },
                        password: value => {
                                    if (!value) {
                                                errors.password = 'Введите пароль';
                                    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.email)) {
                                                errors.password = isAuth ? 'Неверный пароль' : 'Слишком простой пароль';
                                    }
                        }
            };

            Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};